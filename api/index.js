const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
var router = new Router();
const rp = require('request-promise');
const cors = require('@koa/cors');
var moment = require("moment");
require('dotenv').config()


const port = process.env.PORT || 4000
const uri = process.env.API 
const unit = process.env.UNIT
const appkey = process.env.APPID

app.use(cors());

router.get('/:city', ctx => {
    const openWeatherAPI = `${uri}${ctx.params.city}&units=${unit}&appid=${appkey}`
    return rp(encodeURI(openWeatherAPI))
        .then(res => { 
            let weatherData = JSON.parse(res);
            let dtData = weatherData.list;            
            let bank = [];
            let today = moment().date();
            let sortData = dtData.filter(day => {
                let ApiDate = moment.unix(day.dt).date();
                if (ApiDate === today) {
                    return false;
                } else if (bank.indexOf(ApiDate) > -1) {
                    return false;
                } else {
                    bank.push(ApiDate);
                    return true;
                }
            });
            ctx.body = sortData;
        }).catch(err => {
            console.log(err);
        });

})
app
    .use(router.routes())
    .use(router.allowedMethods());

const server = app.listen(port, () => {
    console.log('Server is running on PORT ' + port)
})

module.exports = server;