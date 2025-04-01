import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { initLogin } from './login.js';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>

    <div id="login" class="card">
      <div id="loading" class="card">
        <p>Loading ... </p>
      </div>

      <form id="form" class="card" style="display: none;">
        <input type="text" id="username" name="username" /><br />
        <input type="password" id="password" name="password" /><br />
        <button type="submit" id="submit"></button>
      </form>

      <div id="success" class="card" style="display: none;">
        <p>Access Token: <em id="accessToken"></em></p>
        <button id="logout">Logout</button>
      </div>
    </div>

    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

initLogin(document.querySelector('#login'));
