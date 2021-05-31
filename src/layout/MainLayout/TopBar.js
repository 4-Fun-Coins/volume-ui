import {AppBar, makeStyles, Toolbar, Typography, Box, Grid, Button} from "@material-ui/core";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
const Big = require('big-js');

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
    const [fuel, setFuel] = useState(2452103);
    const [initialFuel, setInitialFuel] = useState(6307200);
    const [fuelPercentage, setFuelPercentage] = useState(new Big(0));

    useEffect(() => {
        if (!initFuel) {
            setFuelPercentage(new Big(fuel).div(initialFuel).times(100));
            setInitFuel(true);
        }
    }, [initFuel]);

    return (
        <AppBar
            color={"primary"}
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolBar}>
                <Grid container justify={"space-between"} style={{
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
                        <Typography variant="h4" className={classes.topBarText}>
                            {
                                `${Math.round(new Big(fuel).div(initialFuel).times(100))}%`
                            }
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Box flexGrow={1} className={classes.priceContainer}>
                            <Typography variant={"h4"} className={classes.topBarText}>
                                Price: $1.27
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;