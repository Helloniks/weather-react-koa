import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, CardActionArea ,Box } from "@material-ui/core";
var moment = require("moment");

const Weather = ({ weatherData, isLoading }) => {

    const useStyles = makeStyles({ title: { fontSize: 20 }, pos: { marginBottom: 12 } });
    const classes = useStyles();
    const roundTemp = temp => { return Math.round(temp * 10) / 10 };
    const weatherIcon = e => {
        switch (e) {
            case "10n": case "10d": case "9n": case "9d":
                return "rain";
            case "02d": case "02n": case "03d": case "03n": case "04d": case "04n":
                return "clouds";
            case "13n": case "13d":
                return "snow";
            case "01n": case "01d":
                return "clearSky";
            case "11n": case "11d":
                return "thunderstorm";
            case "50n": case "50d":
                return "mist";
            default:
                return "sunny";
        }
    };

    const content = isLoading ? (
      <div className="content-center main-container">
        <CircularProgress />
        </div>
    ) : typeof (weatherData) !== "string" ? (<div className="main-container">
        <Grid container direction="row" spacing={2} justify="center">
            {weatherData.map(data => (
                <Grid item xs={12} sm={2} key={data.dt}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardContent>
                                <img className={weatherIcon(data.weather[0].icon)} alt="" />
                                <Typography noWrap gutterBottom variant="h5" component="h2">
                                    {data.weather[0].description}
                                </Typography>
                            </CardContent>
                            <CardContent>                                
                                    <sub><h4>min : {roundTemp(data.main.temp_min)}</h4></sub>                                
                                <h3>Temperature : {roundTemp(data.main.temp)}&#176;C</h3>                                
                                    <sup><h4>max : {roundTemp(data.main.temp_max)}</h4></sup>                                
                                <h4>{moment.unix(data.dt).format("dddd, MMM D")}</h4>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>) : (<div className="content-center main-container"> <Box color="error.main"> {weatherData} </Box> </div>)
    return (
        <div>{content}</div>
    );
};
export default Weather;
