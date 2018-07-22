const Spreadsheet = require('google-spreadsheet');
const Promise = require('bluebird');

const getRows = async (SPREADSHEET_ID, credentials) => {
  const doc = Promise.promisifyAll(new Spreadsheet(SPREADSHEET_ID));
  // Prepare authentication to access spreadsheet
  await doc.useServiceAccountAuthAsync(credentials);

  // Fetch worksheet from spreadsheet information
  const { worksheets: [worksheet] } = await doc.getInfoAsync();

  // Get first worksheet (tab)
  const sheet = Promise.promisifyAll(worksheet);

  // Get all cells with value from first column
  return sheet.getRowsAsync();
};

module.exports = {
  getRows,
};
