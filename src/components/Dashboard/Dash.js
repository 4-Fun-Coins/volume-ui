import {
    Container,
    Grid,
    makeStyles
} from "@material-ui/core";
import React from "react";
import FuelGauge from "./FuelGauge";
import LeaderboardHome from "./LeaderBoardHome";
import {GlobalStats} from "./StatsV3";
import Alert from "@material-ui/lab/Alert";
import useVolume from "../../hooks/useVolume";

const styles = makeStyles((theme) => ({
    compactGrid: {
        padding: '16px !important',
    }
}));

const Dash = () => {
    const classes = styles();
    const volume = useVolume();

    return (
        <Container
            maxWidth={false}
            style={{paddingTop: '2em'}}
        >
            <Grid container direction={"row-reverse"} justifyContent={"center"} spacing={1}>
                {!volume.ecosystemStats.tookOff && <Grid item xs={12}>
                    <Alert severity="info">
                        Volume Rocket has not Launched yet it is scheduled to launch on block:
                        <strong>{volume.ecosystemStats.takeoffBlock === 0 ? " Not Decided yet" : volume.ecosystemStats.takeoffBlock}</strong>
                    </Alert>
                </Grid>}
                <Grid container item xs={12} sm={12} md={6} direction={'column'} className={classes.compactGrid}>
                    <Grid container item className={classes.compactGrid}>
                        <FuelGauge/>
                    </Grid>

                    <Grid container item style={{padding: '0px'}}>
                        <GlobalStats/>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={12} md={6} className={classes.compactGrid}>
                    <LeaderboardHome/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dash;