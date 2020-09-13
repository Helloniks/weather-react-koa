import React, { Component } from "react";
import Header from "../components/header";
import Form from "../components/form";
import Weather from "../components/weather";
import { Container } from "@material-ui/core";
import * as Constant from "../constants/common";


export default class homeContainer extends Component {
  state = {
    weatherData: [],
    isLoading: false
  };

  getWeatherContion = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if (city) {
      this.setState({ isLoading: true });
      fetch(`${Constant.LocalAPI}${city}`)
        .then(response => {
          return response.ok ? response.json() : Constant.NoDataMessage
        })
        .then(data =>
          this.setState({ weatherData: data, isLoading: false })
        )
    }
    else { this.setState({ weatherData: Constant.ValidationMessage }) }
  };
  render() {
    return (
      <>
        <Header />
        <Container maxWidth="xs">
          <Form getWeather={this.getWeatherContion} />
        </Container>
        <Weather weatherData={this.state.weatherData} isLoading={this.state.isLoading} />
      </>
    );
  }
}
