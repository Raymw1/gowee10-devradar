import React, { useEffect } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

export default function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (err) => console.error(err),
      { timeout: 30000 }
    );
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Github Username</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              required
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input type="text" name="techs" id="techs" required />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="text" name="latitude" id="latitude" required />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="text" name="longitude" id="longitude" required />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars.githubusercontent.com/u/72581482?v=4"
                alt="Raymw1"
              />
              <div className="user-info">
                <strong>Rayan Wilbert</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>
              I am looking for challenges that improve simple things in people's
              routine.
            </p>
            <a href="https://github.com/Raymw1">Github Profile</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars.githubusercontent.com/u/72581482?v=4"
                alt="Raymw1"
              />
              <div className="user-info">
                <strong>Rayan Wilbert</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>
              I am looking for challenges that improve simple things in people's
              routine.
            </p>
            <a href="https://github.com/Raymw1">Github Profile</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars.githubusercontent.com/u/72581482?v=4"
                alt="Raymw1"
              />
              <div className="user-info">
                <strong>Rayan Wilbert</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>
              I am looking for challenges that improve simple things in people's
              routine.
            </p>
            <a href="https://github.com/Raymw1">Github Profile</a>
          </li>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars.githubusercontent.com/u/72581482?v=4"
                alt="Raymw1"
              />
              <div className="user-info">
                <strong>Rayan Wilbert</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>
              I am looking for challenges that improve simple things in people's
              routine.
            </p>
            <a href="https://github.com/Raymw1">Github Profile</a>
          </li>
        </ul>
      </main>
    </div>
  );
}
