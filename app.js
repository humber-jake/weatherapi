const express = require('express');
const app = express();
const PORT = 8000;

const allCities = require('./cities.js');


// Function to generate fake weather for each entry:

const fakeWeather = (city) => {
    let weather = [`sunny`, `rainy`, `overcast`, `snowing`, `hail`, `freezing rain`]
    let result = {};
        result.city = city;
        result.currentWeather = weather[Math.floor(Math.random() * 6)];
        result.temperature =`${Math.floor(Math.random() * 60 + 40)}°F`;
        result.humidity = `${Math.floor(Math.random() * 100)}%`;
        result.percentageOfPrecipitation = `${Math.floor(Math.random() * 10) * 10}%`;
        return result;
}

// Seed a bunch of fake city weather data upon launch:

class Weather {
    constructor(city){
        return fakeWeather(city);
    }
}

const seedCities = (cities) => {
    let data = [];
 cities.forEach(city => {
     data.push(new Weather(city));
 });
 return data;
}

const findCity = (search, data) => {
    let result;
    data.forEach(obj => {
        if(obj.city === search){
            result = obj;
        }
        else if(result === undefined){
            result = `City could not be found`;
        }
    });
    return result;
}

// middleware and housekeeping, parsing JSON, setting directories, etc

app.use(express.json());
app.use(express.static(__dirname + `/public`));
app.set('view engine','ejs');



// seed data

console.log(`seeding cities...`);
const data = seedCities(allCities);


// Routes

app.get('/', (req, res) => {
 res.redirect('weather');
})

app.get('/weather', (req, res) => {
    if(Object.entries(req.query).length > 0){
        res.send(findCity(req.query.city, data))
    }
    else {
        res.send(data);
    }
})

app.listen(PORT, () => {
    console.log(`server is live on ${PORT}`)
});