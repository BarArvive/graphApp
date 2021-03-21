import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PieChartIcon from '@material-ui/icons/PieChart';
import Hidden from '@material-ui/core/Hidden';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LineChart from "./lineChart"
import CoulmnChart from "./columnChart"
import PieChart from "./pieChart"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    background: '#7725aa',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  toolbarButton: {
    marginLeft: '10px'
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Typography variant="h4" className="Logo">
              GraphsMaker
          </Typography>
            <div className={classes.toolbarButtons}>
              <Button color="inherit" size="large" className={classes.toolbarButton} href="/linechart">
                <Hidden only={['xs', 'sm']}> Line Chart </Hidden>
                <TimelineIcon fontSize="large" />
              </Button>
              <Button color="inherit" size="large" className={classes.toolbarButton} href="/columnchart">
                <Hidden only={['xs', 'sm']}> Column Chart </Hidden>
                <EqualizerIcon fontSize="large" /></Button>
              <Button color="inherit" size="large" className={classes.toolbarButton} href="/piechart">
                <Hidden only={['xs', 'sm']}>  Pie Chart </Hidden>
                <PieChartIcon fontSize="large" /></Button>
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/linechart">
            <LineChart />
          </Route>
          <Route path="/columnchart">
            <CoulmnChart />
          </Route>
          <Route path="/piechart">
            <PieChart />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
