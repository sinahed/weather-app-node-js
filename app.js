

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res) {

    res.sendFile(__dirname + "/index.html" );

});

app.post("/", function(req,res){


const query = req.body.cityName;
const appKey = "1b8b50703a013233549597adc4b69a7d";
const unit = "metric"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ appKey +"&units=" + unit;
https.get(url, function(response){
console.log(response.statusCode);

response.on("data", function(data){

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const des = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const iconURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
    console.log(temp);
    console.log(des);
     
    
    res.write("<h1>the weater is " + des + " in this moment</h1>");
    res.write("<h1>the temperture in " +  query+ " is " + temp + " degree C</h1>");
    res.write("<img src=" + iconURL + ">");
    res.send();
})

})

});






app.listen(3000, function() {
    console.log("server is on port 3000.")
});