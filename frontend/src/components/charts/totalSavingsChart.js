import React from 'react'
import {RadialChart} from 'react-vis';
import { Grid } from '@material-ui/core';

export default class TotalSavingChart extends React.Component {

  render() {
    return(
      this.props.data && <React.Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="left"
          justify="left"
        >
          <Grid item xs={12} md={3}>
            <p>Säästöt alueittain</p>
            <RadialChart
              showLabels={true}
              labelsAboveChildren={true}
              animations={true}
              padAngle={0.04}
              innerRadius={80}
              radius={140}
              labelsStyle={{
                fontSize: 14,
                fontFamily: "Tahoma",
                fontColor: "#FFFFFF",
                letterSpacing: 0.4,
                fill: "#FFF",
                textTransform: "Uppercase"
              }}
              data={this.props.data}
              width={320}
              height={320} />
          </Grid>


        </Grid>
      </React.Fragment>
    )   
  }
}