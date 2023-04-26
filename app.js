const express = require('express');
const request = require('request');

const app = express();

app.use(express.json());

app.post('/chat', (req, res) => {
  const APIKey = '02fa23dad3e88e5f85e7aeb720c8412c';
  const city = req.body.queryResult.parameters.city;
  const unit = req.body.queryResult.parameters.unit;

  request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&units=${unit}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const weatherDescription = data.weather[0].description;
      res.send({
        fulfillmentText: `A previsão do tempo em ${city} é ${weatherDescription}.`
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