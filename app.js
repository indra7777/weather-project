const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");

});
app.post('/',function (req,res) {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d935d2faaecdfaf4b172303806735335&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function (data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temperature in "+city+" is "+temperature+" degree celsius</h1>");
            res.write('<img src='+imageUrl+'>');
            res.send();
        });

    });
});
app.listen(3000,function(){
    console.log("Server is running on 3000 port");
});