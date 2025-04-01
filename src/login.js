import { davinci } from '@forgerock/davinci-client';
import { Config, FRUser, TokenManager } from '@forgerock/javascript-sdk';

const config = {
  clientId: '724ec718-c41c-4d51-98b0-84a583f450f9',
  redirectUri: window.location.origin + '/',
  scope: 'openid profile email name revoke',
  serverConfig: {
    wellknown:
      'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/as/.well-known/openid-configuration',
  },
};

export async function initLogin(container) {
  const loadingEl = container.querySelector('#loading');
  const formEl = container.querySelector('#form');
  const successEl = container.querySelector('#success');
  const logoutEl = container.querySelector('#logout');

  const davinciClient = await davinci({ config });
  Config.setAsync(config);

  async function renderForm() {
    console.log('renderForm function called');

    const collectors = davinciClient.getCollectors();
    console.log(collectors);

    const protectCollector = collectors.find((collector) => collector.name === 'protectsdk');

    if (protectCollector) {
      davinciClient.update(protectCollector)('fakeprofile');
      await davinciClient.next();
      renderForm();
      return;
    }

    loadingEl.style.display = 'none';
    formEl.style.display = 'block';

    collectors.forEach((collector) => {
      if (collector.type === 'TextCollector') {
        container.querySelector('#username').placeholder = collector.output.label;
        container.querySelector('#username').addEventListener('blur', (event) => {
          davinciClient.update(collector)(event.target.value);
        });
      } else if (collector.type === 'PasswordCollector') {
        container.querySelector('#password').placeholder = collector.output.label;
        container.querySelector('#password').addEventListener('blur', (event) => {
          davinciClient.update(collector)(event.target.value);
        });
      } else if (collector.type === 'SubmitCollector') {
        container.querySelector('#submit').innerText = collector.output.label;
      }
    });
  }

  async function renderSuccess() {
    console.log('renderSuccess function called');

    loadingEl.style.display = 'none';
    formEl.style.display = 'none';
    successEl.style.display = 'block';

    const clientInfo = davinciClient.getClient();

    const code = clientInfo.authorization?.code || '';
    const state = clientInfo.authorization?.state || '';

    console.log('code: ', code);
    console.log('state: ', state);

    const tokens = await TokenManager.getTokens({ query: { code, state }});

    document.querySelector('#accessToken').innerText = tokens.accessToken;
  }

  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nextNode = await davinciClient.next();

    if (nextNode.status === 'continue') {
      renderForm();
    } else if (nextNode.status === 'success') {
      renderSuccess();
    } else if (nextNode.status === 'error') {
      console.error('Error: ', nextNode);
    } else {
      console.error('Failure: ', nextNode)
    }
  });

  logoutEl.addEventListener('click', async (event) => {
    event.preventDefault();

    await FRUser.logout({ logoutRedirectUri: window.location.origin + '/' });

    successEl.style.display = 'none';
    formEl.style.display = 'block';

    window.location.reload();
  });

  const node = await davinciClient.start();

  console.log(node);

  if (node.status === 'continue') {
    renderForm();
  } else if (node.status === 'success') {
    renderSuccess();
  } else if (node.status === 'error') {
    console.error('Error: ', node);
  } else {
    console.error('Failure: ', node)
  }
}
