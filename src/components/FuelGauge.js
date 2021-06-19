import {
    Container, Grid,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Gauge from "./Gauge";
import {getFuel} from "../utils/volume-core";
import LoadingScreen from "./LoadingScreen";
const Big = require('big-js');



const FuelGauge = () => {
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
        <Container
            maxWidth={false}
        >
            <Grid container item xs={10}>
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
                        max={initFuel}
                        value={fuel}
                        units={"(blocks)"}
                        label={"Fuel Tank"}
                        date={Date.now() + Number(milliseconds)}
                    />
                }
            </Grid>

            <Grid container item xs={2}>
                {/*    Connect Button   */}

            </Grid>
        </Container>
    );
}

export default FuelGauge;