const express = require('express');
const request = require('request');

const app = express();

app.use(express.json());

app.post('/chat', (req, res) => {
  const APIKey = '02fa23dad3e88e5f85e7aeb720c8412c';
  const city = req.body.queryResult.parameters.city;
  const unit = req.body.queryResult.parameters.unit;

  request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const country = data.sys.country; // adicionado para obter o país onde a cidade está localizada
      const region = data.sys.region; // adicionado para obter a região onde a cidade está localizada
      let locationInfo = '';
      if (region) {
        locationInfo = `${city}, ${region}, ${country}`;
      } else {
        locationInfo = `${city}, ${country}`;
      }
      res.send({
        fulfillmentText: `A temperatura em ${locationInfo} é ${temperature} graus Celsius e o tempo está ${weatherDescription}.`
      });
    } else {
      res.send({
        fulfillmentText: 'Desculpe, não consegui obter a previsão do tempo.'
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});