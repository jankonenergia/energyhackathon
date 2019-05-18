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
    let sorted = this.props.measurements.sort ( (a, b) => new Date(a.date) - new Date(b.date));
    if(sorted && sorted.length > 1) {
      let data = sorted[1].value - sorted[0].value
      return data
    } else {
      return 0
    }
  }

  render() {

    const data = this.factorData()
    const measurements = this.factorMeasurements()
    return(
      this.props.data && <React.Fragment>

        <Grid item xs={12} md={3}>
          <p>Säästöt Tänään ({data.toFixed(2)}kWh)</p>
          <XYPlot width={320} height={320} stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <YAxis />
            <VerticalBarSeries data={[{x: 1, y: measurements}]} />
            <VerticalBarSeries data={[{x: 1, y: data}]} />
          </XYPlot>
        </Grid>
      </React.Fragment>
    )   
  }
}