import {Container, makeStyles, Grid, Paper, Typography, Box} from "@material-ui/core";
import React from "react";

const aboutStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.default,
        paddingLeft: "2.7em",
        paddingRight: "2.7em",
        paddingTop: "3.8em",
        paddingBottom: "3.8em"
    },
    mainHeading: {
        color: "#f1892c",
        textAlign: "center",
        paddingBottom: "1.8em",
    },
    cardHeading: {
        color: theme.palette.twinkle.main,
        textAlign: "center",
        padding: "0.7em",
    },
    cardBody: {
        color: theme.palette.star.main,
    },
    image1: {
        maxWidth: "50%",
        maxHeight: "100%",
        display: "block",
        paddingTop: '1em'
    },
    image2: {
        maxWidth: "50%",
        maxHeight: "100%",
        display: "block",
        paddingBottom: '1em'
    },
    text: {
        color: theme.palette.text.paragraph
    }
}));

const About = () => {
    const classes = aboutStyles();

    return (
        <Container
            maxWidth={false}
        >
            <Grid container spacing={3} alignItems={"center"} justify={"space-evenly"}>
                <Grid item xs={12}>
                    <Box className={classes.mainHeading}>
                        <Typography variant={"h1"}>
                            The Project
                        </Typography>
                    </Box>
                </Grid>

                <Grid container item xs={12} alignItems={"center"}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} variant={"outlined"}  className={classes.paper}>
                            <Box className={classes.cardHeading}>
                                <Typography variant={"h2"}>
                                    Volume
                                </Typography>
                            </Box>

                            <Box className={classes.cardBody}>
                                <Typography variant={"body1"} className={classes.text}>
                                    Volume is a project created to teach people the basics of tokenomics and how statistics like value and volume are affected by certain core functionalities within a
                                    token.
                                    For instance, if a token has a diminishing supply, the value should have an upwards pressure. However, this does not mean the price can not go down. Volume aims
                                    to teach people this through a practical approach - by letting people see how much fuel they added to the rocket, and how that impacts the time the rocket can
                                    still fly (More on this in tokenomics).
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid container item xs={12} md={6} justify={"center"}>
                        <img
                            alt="Logo"
                            src={"/explorer.jpg"}
                            className={classes.image1}
                        />
                    </Grid>
                </Grid>

                <Grid container item xs={12} alignItems={"center"}>
                    <Grid container item xs={12} md={6} justify={"center"}>
                        <img
                            alt="Logo"
                            src={"/arsonist.jpg"}
                            className={classes.image2}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} variant={"outlined"} className={classes.paper}>
                            <Box className={classes.cardHeading}>
                                <Typography variant={"h2"}>
                                    Tokenomics
                                </Typography>
                            </Box>

                            <Box className={classes.cardBody}>
                                <Typography variant={"body1"} className={classes.text}>
                                    Volume's tokenomics can be broken down into 2 parts:
                                </Typography>

                                <br/>

                                <Typography variant={"body1"} className={classes.text}>
                                    1. Lifetime - As blocks go by, the rocket consumes fuel. It starts on 1 year's worth of blocks on the Binance Smart Chain (approx. 6.2M). Each
                                    block that passes gets removed from the fuel tank. If the tank is empty, the token freezes and can no longer be traded - the rocket has crashed.
                                    Please note that when the ship crashes, you will still be able to redeem your tokens for BNB through the escrow contract.
                                </Typography>

                                <br/>

                                <Typography variant={"body1"} className={classes.text}>
                                    2. Refuel - Every transaction made will add fuel to the tank (0.01% of the total transaction). The amount of fuel added will be proportional to the
                                    amount burned from the total supply. For instance, if the total supply is 100 and your transaction resulted in 10 tokens being burned,
                                    you burned 10% of the total supply and you will add 10% to the remaining fuel tank.
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default About;