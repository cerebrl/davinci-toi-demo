const config = {
  clientId: '<your client id>',
  redirectUri: window.location.origin + '/',
  scope: '<your scopes>',
  serverConfig: {
    wellknown: '<your pingone server>/as/.well-known/openid-configuration',
  },
};

export async function initLogin(element) {
  // Add DaVinci logic for initialization with config

  const loadingEl = element.querySelector('#loading');
  const formEl = element.querySelector('#form');
  const successEl = element.querySelector('#success');
  const logoutEl = element.querySelector('#logout');

  async function renderForm() {
    console.log('renderForm function called');

    // Add collector logic for supporting form rendering
  }

  async function renderSuccess() {
    loadingEl.style.display = 'none';
    formEl.style.display = 'none';
    successEl.style.display = 'block';

    // Exchange code and state for access token with SDK
  }

  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Call DaVinci for collecting the next node
  });

  logoutEl.addEventListener('click', async (event) => {
    event.preventDefault();

    // Add Logout from SDK

    loadingEl.style.display = 'none';
    successEl.style.display = 'none';
    formEl.style.display = 'block';

    window.location.reload();
  });
}