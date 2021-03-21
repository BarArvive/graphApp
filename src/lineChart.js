import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
    toolbarButtons: {
        marginLeft: 'auto',
    },
    toolbarButton: {
        marginLeft: '10px'
    },
    card: {
        margin: '15px',
        textAlign: 'center',

    },
}));

function LineChart() {
    const classes = useStyles();
    const [points, setPoints] = useState([]);
    const [checked, setChecked] = useState(true);
    const [title, setTitle] = useState("");
    const [titleX, setTitleX] = useState("");
    const [titleY, setTitleY] = useState("");
    const [xPoint, setXPoint] = useState(0);
    const [yPoint, setYPoint] = useState(0);

    const addPoint = () => {
        const isExist = points.some(point => point.x === parseInt(xPoint) && point.y === parseInt(yPoint));
        if (!isExist) {
            if (checked)
                setPoints(prev => [...prev, { x: parseInt(xPoint), y: parseInt(yPoint) }].sort((a, b) => a.x - b.x));
            else
                setPoints(prev => [...prev, { x: parseInt(xPoint), y: parseInt(yPoint) }]);
        }
    }

    const delPoint = (chip, index) => {
        let copy = [...points];
        copy.splice(index, 1);
        setPoints(copy);
    }

    const sortPoints = () => {
        let updated = [...points]
        updated.sort((a, b) => a.x - b.x)
        setPoints(updated)
    }

    const handleChange = () => {
        const updated = !checked;
        setChecked(updated)
        if (!checked)
            sortPoints()
    }

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: title
        },
        axisY: {
            title: titleY,
        },
        axisX: {
            title: titleX,
        },
        data: [{
            type: "line",
            dataPoints: points
        }]
    }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <div className={classes.card}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Line Chart Maker</Typography>
                                <hr />
                                <TextField
                                    style={{ margin: '10px', width: '72%' }}
                                    id="graphName"
                                    label="Graph Name"
                                    defaultValue={title}
                                    helperText="The name of this graph"
                                    variant="outlined"
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <TextField
                                    style={{ margin: '10px', width: '72%' }}
                                    id="x-name"
                                    label="Axis X Name"
                                    defaultValue={titleX}
                                    helperText="indexes' name"
                                    variant="outlined"
                                    onChange={e => setTitleX(e.target.value)}
                                />
                                <TextField
                                    style={{ margin: '10px', width: '72%' }}
                                    id="y-name"
                                    label="Axis Y Name"
                                    defaultValue={titleY}
                                    helperText="values' name"
                                    variant="outlined"
                                    onChange={e => setTitleY(e.target.value)}
                                />
                                <TextField
                                    style={{ margin: '10px', width: '24%' }}
                                    id="x-point"
                                    label="X's Value"
                                    type="number"
                                    defaultValue={xPoint}
                                    variant="outlined"
                                    onChange={e => setXPoint(e.target.value)}
                                />
                                <TextField
                                    style={{ margin: '10px', width: '24%' }}
                                    id="y-point"
                                    label="Y's Value"
                                    type="number"
                                    value={yPoint}
                                    variant="outlined"
                                    onChange={e => setYPoint(e.target.value)}
                                />
                                <Button variant="outlined" color="primary" size="large"
                                    style={{ margin: '10px', width: '18%', height: '6.5vh' }}
                                    onClick={addPoint}
                                >Add Point</Button>
                                <br />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Sort Points"
                                />
                                <br />
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={classes.card}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Your Line Chart</Typography>
                                <hr />
                                <Typography variant="h6">Points:</Typography>
                                <ChipInput
                                    value={points.map(obj => `(${obj.x},${obj.y})`)}
                                    onDelete={delPoint}
                                />
                                <CanvasJSChart options={options} />
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
export default LineChart;
