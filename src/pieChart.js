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

function PieChart() {
    const classes = useStyles();
    const [labels, setLabels] = useState([]);
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(true);
    const [label, setLabel] = useState("");
    const [yPoint, setYPoint] = useState(0);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    }
    const addLabel = () => {
        const isExist = labels.some(l => l.label === label);
        if (!isExist) {
            setLabels(prev => [...prev, { label: label, y: parseInt(yPoint) }]);
        }
    }

    const delLabel = (chip, index) => {
        let copy = [...labels];
        copy.splice(index, 1);
        setLabels(copy);
    }
    const options = {
        title: {
            text: title
        },
        exportEnabled: true,
        data: [{
            type: "pie",
            indexLabelPlacement: checked ? "inside" : "outside",
            dataPoints: labels
        }]
    }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <div className={classes.card}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Pie Chart Maker</Typography>
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
                                    style={{ margin: '10px', width: '24%' }}
                                    id="label"
                                    label="Label Name"
                                    defaultValue={label}
                                    variant="outlined"
                                    onChange={e => setLabel(e.target.value)}
                                />
                                <TextField
                                    style={{ margin: '10px', width: '24%' }}
                                    id="y-point"
                                    label="Label's Value"
                                    defaultValue={yPoint}
                                    type="number"
                                    variant="outlined"
                                    onChange={e => setYPoint(e.target.value)}
                                />
                                <Button variant="outlined" color="primary" size="large"
                                    style={{ margin: '10px', width: '18%', height: '6.5vh' }}
                                    onClick={addLabel}
                                >Add Column</Button>
                                <Typography variant="h6">Labels:</Typography>
                                <ChipInput
                                    value={labels.map(obj => `${obj.label}: ${obj.y}`)}
                                    onDelete={delLabel}
                                />
                                <br />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Inside index label placement"
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
                                <Typography variant="h5">Your Pie Chart</Typography>
                                <hr />
                                <CanvasJSChart options={options} />
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default PieChart;
