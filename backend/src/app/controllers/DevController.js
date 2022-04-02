const Dev = require("../models/Dev");
const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../../websocket");

class DevController {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const { data } = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = data;
      const techs = parseStringAsArray(req.body.techs);
      const location = { type: "Point", coordinates: [longitude, latitude] };
      dev = await Dev.create({
        name,
        avatar_url,
        bio,
        github_username,
        techs,
        location,
      });
      const sendMessageTo = findConnections({ latitude, longitude }, techs);
      sendMessage(sendMessageTo, "new-dev", dev);
    }
    return res.json(dev);
  }
}

module.exports = new DevController();
