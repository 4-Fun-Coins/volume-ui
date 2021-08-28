import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Gauge from "./Gauge";
import {getFuel} from "../../utils/volume-core";
import LoadingScreen from "../LoadingScreen";

const Big = require('big-js');

const FuelGauge = () => {
    const initialFuel = 2592000;

    const [initFuel, setInitFuel] = useState(false);
    const [fuel, setFuel] = useState(new Big(0));
    const [milliseconds, setMilliseconds] = useState(new Big(0));

    useEffect(() => {
        if (!initFuel) {
            getFuel().then((res, rej) => {
                if (!rej) {
                    setFuel(new Big(res));
                    setMilliseconds(new Big(res).times(3000));
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
                    <Grid container justifyContent={"center"}>
                        <LoadingScreen transparent/>
                    </Grid>
                }
                {initFuel &&
                <Gauge
                    min={0}
                    max={initialFuel.toFixed(2)}
                    value={fuel.toFixed(2)}
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