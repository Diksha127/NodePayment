const cron = require('cron');
const https = require('https');

const backendUrl = 'https://paymentserver-vpjj.onrender.com';
const jon = new cron.CronJob('*/14 * * * *', function() {
  console.log('Restarting server');

  https.get(backendUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Server restarted');
    } else {
      console.error('Failed to start');
    }
  }).on('error', (err) => {
    console.error('Error during restart', err);
  });
});

module.exports = {
  jon,
};








