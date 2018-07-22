const colors = require('colors/safe');

const theme = {
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  success: 'green',
  warn: 'yellow',
  info: 'magenta',
  error: 'red',
};

colors.setTheme(theme);

const shouldLog = type => type !== 'verbose'
    || process.argv.some(
      arg => ['-v', '--verbose'].includes(arg),
    );

module.exports = Object.keys(theme)
  .reduce((obj, type) => ({
    ...obj,
    // eslint-disable-next-line
    [type]: text => shouldLog(type) && console.log(
      colors[type](`- ${text}`),
    ),
  }), {});
