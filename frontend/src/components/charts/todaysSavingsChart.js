import React from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import { Grid } from '@material-ui/core';

export default class TodaysSavingsChart extends React.Component {


  factorData = () => {
    let data = 0
    this.props.data.map((item) => {
      data += item.consumptionType.amount * item.value
    })
    return data
  }

  factorMeasurements = () => {
    let data = 0
    this.props.measurements.map((item) => {
      data += item.value
    })
    return data
  }

  render() {

    const data = this.factorData()
    const measurements = this.factorMeasurements()
    return(
      this.props.data && <React.Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
        >
          <Grid item xs={12} md={3}>
            <p>Säästöt Tänään ({data.toFixed(2)}kWh)</p>
            <XYPlot width={300} height={300} stackBy="y">
              <VerticalGridLines />
              <HorizontalGridLines />
              <YAxis />
              <VerticalBarSeries data={[{x: 1, y: data}]} />
              <VerticalBarSeries data={[{x: 1, y: measurements}]} />
            </XYPlot>
          </Grid>
        </Grid>
      </React.Fragment>
    )   
  }
}