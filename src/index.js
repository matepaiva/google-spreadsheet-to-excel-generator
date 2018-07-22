require('dotenv').config();

const { join } = require('path');
const { promisify } = require('util');
const { writeFile, readFile } = require('fs');
const { renderExcel } = require('ejsexcel');
const { rootPath } = require('get-root-path');

const credentials = require('../creds.json');
const fetchSpreadsheet = require('./fetchSpreadsheet');
const rowParser = require('./rowParser');
const log = require('./log');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const {
  TEMPLATE_FILENAME = 'template.xlsx',
  TEMPLATE_FOLDER = 'templates',
  DESTINATION_FILENAME = 'result.xlsx',
  DESTINATION_FOLDER = '',
  DATETIME_OUTPUT_FORMAT = 'YYYY-MM-DD HH:mm',
  SPREADSHEET_ID,
} = process.env;

const templatePath = join(rootPath, TEMPLATE_FOLDER, TEMPLATE_FILENAME);
const destinationPath = join(rootPath, DESTINATION_FOLDER, DESTINATION_FILENAME);

const start = async () => {
  try {
    log.success('Starting the job...');

    log.verbose('Getting information from Google Spreadsheet...');
    const rows = await fetchSpreadsheet.getRows(SPREADSHEET_ID, credentials);

    log.verbose('Parsing...');
    const transactions = rows.map(
      rowParser.mapRowToSemanticData.bind(null, DATETIME_OUTPUT_FORMAT),
    );

    log.verbose('Reading Excel template...');
    const template = await readFileAsync(templatePath);

    log.verbose('Generating Excel buffer...');
    const result = await renderExcel(template, { transactions });

    log.verbose('Writing buffer into file...');
    await writeFileAsync(destinationPath, result);

    log.success('File successfully created!', 'success');
    log.prompt(`Saved at ${destinationPath}`, 'prompt');
  } catch (error) {
    log.error(`Something went wrong: ${error.stack}`, 'error');
  }
};

start();
