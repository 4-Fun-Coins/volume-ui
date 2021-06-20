import {
    Container,
    Grid,
} from "@material-ui/core";
import React from "react";
import FuelGauge from "./FuelGauge";
import Stats_V2 from "./Stats_V2";
import Leaderboard from "./Leaderboard";

const Dash = () => {

    return (
        <Container
            maxWidth={false}
        >
            <Grid container direction={"row"} justify={"center"} spacing={2}>
                <Grid container item direction={"column"} xs={6} spacing={2}>
                    <Grid container item xs={12}>
                        <FuelGauge/>
                    </Grid>

                    <Grid container item xs={12}>
                        <Stats_V2/>
                    </Grid>
                </Grid>

                <Grid container item xs={6}>
                    <Leaderboard/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dash;