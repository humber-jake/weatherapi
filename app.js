const express = require('express');
const app = express();
const PORT = 8000;

import allCities from './cities';

const fakeWeather = () => {
    let weather = [`sunny`, `rainy`, `overcast`, `snowing`, `hail`, `freezing rain`]
    let result = {};
        result.currentWeather = weather[Math.floor(Math.random() * 6)];
        result.temperature =`${Math.floor(Math.random() * 60 + 40)}°F`;
        result.humidity = `${Math.floor(Math.random() * 100)}%`;
        result.percentageOfPrecipitation = `${Math.floor(Math.random() * 10) * 10}%`;
        return result;
}

app.use(express.json());
app.use(express.static(__dirname + `/public`));
app.set('view engine','ejs');

class Weather {
    constructor(city){
        this.city = city;
        this.data = fakeWeather();
    }
}

app.get('/', (req, res) => {
 res.redirect('weather');
})

app.get('/weather', (req, res) => {
    res.render('index');
})

app.get('/weather/:city', (req, res) => {
    res.send(trimCities(allCities));
})

app.listen(PORT, () => {
    console.log(`server is live on ${PORT}`)
});