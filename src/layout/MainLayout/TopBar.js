import {AppBar, makeStyles, Toolbar, Typography, Box, Grid, CircularProgress} from "@material-ui/core";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import LoadingScreen from "../../components/LoadingScreen";
import Countdown from "react-countdown";

const Big = require('big-js');
const {getFuel} = require('../../utils/volume-core');

const topBarStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    toolBar: {
        height: 72
    },
    logo: {
        marginRight: theme.spacing(2)
    },
    topBarText: {
        color: theme.palette.twinkle.main,
        mixBlendMode: "difference",
        padding: '0.3em'
    },
    priceContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
}));

const TopBar = ({className, ...rest}) => {
    const classes = topBarStyles();

    const [initFuel, setInitFuel] = useState(false);
    const [fuel, setFuel] = useState(new Big(0));
    const [seconds, setSeconds] = useState(new Big(0));

    const [initialFuel, setInitialFuel] = useState(6307200);

    const [initPercentage, setInitPercentage] = useState(false);
    const [fuelPercentage, setFuelPercentage] = useState(new Big(0));

    useEffect(() => {
        if (!initFuel) {
            getFuel().then((res, rej) => {
                if (!rej) {
                    setFuel(new Big(res));
                    setSeconds(new Big(res).times(5000));
                    console.log(new Big(res).times(5000).toString());
                    setInitFuel(true);
                }
            });
        }
    }, [initFuel]);

    useEffect(() => {
        if (initFuel) {
            setFuelPercentage(new Big(fuel).div(initialFuel).times(100));
            setInitPercentage(true);
        }
    }, [initFuel, initPercentage]);

    return (
        <AppBar
            color={"primary"}
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolBar}>
                <Grid container
                      alignItems={"center"}
                      justify={"space-between"}
                      style={{
                          background: `linear-gradient(to right, #F5BC00 ${initFuel ? fuelPercentage : 100}%, #0A0A0A ${initFuel ? fuelPercentage : 0}%)`,
                          borderRadius: 20
                      }}>
                    {/*<Logo className={classes.logo}/>*/}

                    <Grid item>
                        <Typography variant={"h4"} className={classes.topBarText}>
                            VOLUME
                        </Typography>
                    </Grid>

                    <Grid item>
                        {
                            !initPercentage &&
                            <CircularProgress style={{color: "#0A0A0A", padding: '0.3em'}}/>
                        }
                        {
                            initPercentage &&
                            <Countdown className={classes.topBarText} date={new Big(Date.now()).plus(seconds)}/>
                        }
                    </Grid>

                    <Grid item>
                        <Box flexGrow={1} className={classes.priceContainer}>
                            <Typography variant={"h4"} className={classes.topBarText}>
                                {/*Price: $ - TODO fetch*/}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;