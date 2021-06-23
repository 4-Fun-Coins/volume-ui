import {AppBar, Button, Divider, Grid, makeStyles, Toolbar} from "@material-ui/core";
import clsx from "clsx";
import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import {useWallet} from "use-wallet";

const topBarStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#1d0134"
    },
    toolBar: {
        height: 72
    },
    volText: {
        color: theme.palette.twinkle.main
    },
    boldText: {
        color: theme.palette.twinkle.main,
        fontWeight: "bold",
        textDecoration: "underline"
    }
}));

const TopBar = ({className, changeNetwork, network, ...rest}) => {
    const classes = topBarStyles();
    const wallet = useWallet();

    useEffect(() => {
        console.log(wallet.status);
        console.log(wallet.error);
    }, [wallet.status]);

    const newNetwork = (netId) => {
        if (network !== netId) {
            changeNetwork(netId);
            wallet.connect();
        }
    }

    return (
        <AppBar
            color={"primary"}
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolBar}>
                <Grid container justify={"flex-start"} xs={3}>
                    <Typography variant={"h2"} className={classes.volText}>
                        VOLUME
                    </Typography>
                </Grid>

                <Grid container xs={7} alignItems={"center"} justify={"flex-start"} spacing={4}>
                    {/*Journey*/}
                    <Grid container item xs={6}>
                        <Typography variant={"h4"} className={classes.volText}>
                            The Journey
                        </Typography>
                    </Grid>

                    {/*Details*/}
                    <Grid container item xs={6}>
                        <Typography variant={"h4"} className={classes.volText}>
                            More Details
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container item justify={"flex-end"} xs={12}>
                    <Grid container item xs={6} justify={"flex-end"}>
                        <Button variant={"text"} style={{padding: '1em'}} onClick={() => {
                            newNetwork(56);
                        }}>
                            <Typography variant={"h4"} className={network === 56 ? classes.boldText : classes.volText}>
                                BSC
                            </Typography>
                        </Button>

                        <Divider orientation={"vertical"} variant={"fullWidth"} style={{width: '1px',backgroundColor: "grey"}}/>

                        <Button variant={"text"} style={{padding: '1em'}} onClick={() => {
                            newNetwork(42);
                        }}>
                            <Typography variant={"h4"} className={network === 42 ? classes.boldText : classes.volText}>
                                Kovan
                            </Typography>
                        </Button>
                    </Grid>

                    <Grid container item xs={2} justify={"flex-end"}>
                        <Button variant={"text"} style={{padding: '1em'}} onClick={() => {
                            if (wallet.status !== 'connected')
                                wallet.connect();
                        }}>
                            <Typography variant={"h4"} className={classes.volText}>
                                {
                                    wallet.status === 'connected'
                                        ? `${wallet.account.slice(0, 6)}...${wallet.account.slice(wallet.account.length-4, wallet.account.length)}`
                                        : 'Connect'
                                }
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;