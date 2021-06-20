import {
    Button,
    Container, Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Gauge from "./Gauge";
import {getFuel} from "../utils/volume-core";
import LoadingScreen from "./LoadingScreen";
import {useWallet} from "use-wallet";
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
    const wallet = useWallet();

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
        <Grid container item spacing={2}>
            <Grid container item xs={12} sm={12} md={10}>
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

            <Grid container item xs={12} sm={12} md={2} justify={"center"}>
                <Grid item xs={12} className={classes.spacer} />
                {/*    Connect Button   */}
                <Grid item xs={12}>
                    <Button className={classes.connectButton} onClick={() => {
                        if (wallet.status === 'disconnected') {
                            wallet.connect();
                        } else {
                            // TODO - view profile here
                        }
                    }}>
                        <Typography className={classes.buttonText}>
                            {wallet.status !== 'connected' ? 'Connect' : `${wallet.account.slice(0, 6)}...${wallet.account.slice(wallet.account.length - 4, wallet.account.length)}`}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FuelGauge;