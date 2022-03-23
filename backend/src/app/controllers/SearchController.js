const Dev = require("../models/Dev");
const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");

class DevController {
  async index(req, res) {
    const { latitude, longitude } = req.query;
    const techs = parseStringAsArray(req.query.techs);
    const devs = await Dev.find({
      techs: {
        $in: techs,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
    return res.json(devs);
  }
}

module.exports = new DevController();
