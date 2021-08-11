import {
    Container,
    Grid,
} from "@material-ui/core";
import React from "react";
import FuelGauge from "./FuelGauge";
import Stats_V2 from "./Stats_V2";
import LeaderboardHome from "./LeaderBoardHome";

const Dash = () => {

    return (
        <Container
            maxWidth={false}
            style={{paddingTop: '2em'}}
        >
            <Grid container direction={"row-reverse"} justify={"center"} spacing={8}>
                <Grid container item xs={12} sm={12} md={6} spacing={2} direction={'column'}>
                    <Grid container item>
                        <FuelGauge/>
                    </Grid>

                    <Grid container item>
                        <Stats_V2/>
                    </Grid>
                </Grid>

                <Grid container item xs={12} sm={12} md={6}>
                    <LeaderboardHome/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dash;