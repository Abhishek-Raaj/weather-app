const fetch = require("node-fetch");
const express=require('express');
const bodyParser = require('body-parser');
const path=require('path');
const app=express();


// pug template
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));
app.use('/static',express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    //  res.sendFile(__dirname+'/static/home.html');
     res.render('index', { title: 'Weather', message: 'Hello there!' });
});
async function getWeather(city) {
    const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=889f90ebf0f56f63185ff3baa092d951`);
    let response = await weather.json();
    return response;

}
app.post('/city',async (req,res)=>{
    try{
    let final= await getWeather(req.body.city);
    console.log(final);
    let mausum=final.weather[0].main;
    let temp=final.main.temp;
    let min_temp=final.main.temp_min;
    let max_temp=final.main.temp_max;
    let humidity=final.main.humidity;
    let city=req.body.city.toUpperCase();
    res.render('report',{mausum:mausum,temperature:temp,min_tem:min_temp,max_tem:max_temp,humidity:humidity,city:city});
    }catch(err){
         res.send("your city name not matched .please enter valid city name");
    }
    
});


app.listen(8090,()=>{
    console.log("running on port 8090");
});