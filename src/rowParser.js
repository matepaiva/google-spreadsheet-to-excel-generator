const moment = require('moment');

const parseNotificationMessage = (getDataBetween, dateFormat) => ({
  provider: getDataBetween('{', '}'),
  institution: getDataBetween('}', 'Informa:'),
  status: getDataBetween('Compra', 'Cartao'),
  cardFlag: getDataBetween('Cartao', 'final'),
  cardLastNumber: getDataBetween('final', 'de'),
  amount: getDataBetween('de', 'em'),
  consumedAt: moment(getDataBetween('em', 18), 'DD-MM-YYYY [as] HH:mm').format(dateFormat),
  location: getDataBetween(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/),
});

const getValueWithinDelimiters = str => (startDelimiter, endDelimiter) => {
  const initialStr = str.split(startDelimiter).pop();

  switch (typeof endDelimiter) {
    case 'string':
      return initialStr.split(endDelimiter).shift().trim();
    case 'number':
      return initialStr.slice(0, endDelimiter).trim();
    default:
      return initialStr.trim();
  }
};

const mapRowToSemanticData = (dateFormat, row) => ({
  receivedAt: moment(row.receivedat, 'MMMM DD, YYYY [at] HH:mmA').format(dateFormat),
  appName: row.appname,
  notificationTitle: row.notificationtitle,
  notificationMessage: row.notificationmessage,
  ...parseNotificationMessage(
    getValueWithinDelimiters(row.notificationmessage),
    dateFormat,
  ),
});

module.exports = {
  mapRowToSemanticData,
};
