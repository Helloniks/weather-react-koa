import React from "react";
import Button from "@material-ui/core/Button";
import { FormControl, Input, InputLabel, Grid, Typography } from "@material-ui/core";

const Form = props => {
  return (<div className="main-container">
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} mx="auto">
        <Typography color="primary" variant="h4" component="h2" mt={5}>
          Get Weather Updates
        </Typography>
        <form onSubmit={props.getWeather}>
          <FormControl>
            <InputLabel htmlFor="my-input">Enter City...</InputLabel>
            <Input id="my-input" name="city" aria-describedby="my-helper-text" />
          </FormControl>
          <Button variant="contained" type="submit" color="primary" size="small" className="submitBtn" >
            Get Weather
          </Button>
        </form>
      </Grid>
    </Grid>
  </div>
  );
};
export default Form;
