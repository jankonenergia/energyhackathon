import React from 'react';
import PropTypes from 'prop-types';
import challengeImg from '../images/challenge.png'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const styles = theme => ({
  card: {
    width: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ChallengeCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.title}
        />
        <CardMedia
          className={classes.media}
          image={challengeImg}
          title={this.props.title}
        />
        <CardContent>
          <Typography component="p">
            {this.props.description && <h2>{this.props.description}</h2>}
            {this.props.from && <p>Voimassa alkaen: {new Date(this.props.from).toLocaleDateString()}</p>}
            {this.props.from && <p>päättyen alkaen: {new Date(this.props.to).toLocaleDateString()}</p>}
            {this.props.limit && <p>Säästötavoite: {this.props.limit}</p>}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
            TOP listat
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ChallengeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChallengeCard);