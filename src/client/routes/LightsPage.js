import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { Paper } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    'border-radius': 'unset'
  },
  Title: {
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strand: {
        id: '',
        color: ''
      }
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={ classes.paper }>
        <Typography variant="display2" gutterBottom className={ classes.Title }>
          Light Settings
      </Typography>
        <FormControl className={ classes.formControl }>
          <InputLabel htmlFor="age-simple" > Room</InputLabel >
          <Select
            value={ this.state.strand.id }
            onChange={ this.handleChange }
            inputProps={ {
              name: 'room',
              id: 'room-id',
            } }
          >
            <MenuItem value={ this.state.strand.id }>
              <em>None</em>
            </MenuItem>
            <MenuItem value="JasonRoom">Jason's Room</MenuItem>
          </Select>
        </FormControl>
        <Divider />
      </Paper>
    );
  }
}

export default withStyles(styles)(LightsPage);
