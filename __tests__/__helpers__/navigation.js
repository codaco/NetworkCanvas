export const start = ({ remote }) =>
  remote
    .refresh()
    // Wait for intro screen
    .sleep(1000);

export const loadTestProtocol = ({ remote }) =>
  start({ remote })
    .elementByName('protocol_url')
    .sendKeys('https://raw.githubusercontent.com/codaco/Network-Canvas-example-protocols/master/test.protocol.js')
    .elementByCssSelector('.setup__custom-protocol button[type=submit]')
    .click()
    .sleep(2000);

export const goToScreen = ({ remote }, number) =>
  loadTestProtocol({ remote })
    .elementById('#next-screen');
