import {
    Button,
    Container, Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Gauge from "./Gauge";
import {getFuel} from "../utils/volume-core";
import LoadingScreen from "./LoadingScreen";

const Big = require('big-js');

const fuelGaugeStyles = makeStyles((theme) => ({
    connectButton: {
        borderRadius: '5em',
        height: '10em',
        width: '10em',
        backgroundColor: '#522d82',
    },
    buttonText: {
        color: "#f9c501",
        textOverflow: 'ellipsis',
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    spacer: {
        height: '10em',
    }
}));

const FuelGauge = () => {
    const classes = fuelGaugeStyles();

    const initialFuel = 6307200;

    const [initFuel, setInitFuel] = useState(false);
    const [fuel, setFuel] = useState(new Big(0));
    const [milliseconds, setMilliseconds] = useState(new Big(0));

    useEffect(() => {
        if (!initFuel) {
            getFuel().then((res, rej) => {
                if (!rej) {
                    setFuel(new Big(res));
                    setMilliseconds(new Big(res).times(5000));
                    setInitFuel(true);
                }
            });
        }
    }, [initFuel]);

    return (
        <Grid container item>
            <Grid container item xs={12}>
                {/*    Fuel Gauge   */}
                {
                    !initFuel &&
                    <Grid container justify={"center"}>
                        <LoadingScreen transparent/>
                    </Grid>
                }
                {   initFuel &&
                    <Gauge
                        min={0}
                        max={initialFuel}
                        value={fuel}
                        units={"(blocks)"}
                        label={"Fuel Tank"}
                        date={Date.now() + Number(milliseconds)}
                    />
                }
            </Grid>


        </Grid>
    );
}

export default FuelGauge;