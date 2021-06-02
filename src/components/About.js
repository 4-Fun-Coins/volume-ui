import {Container, makeStyles, Grid, Paper, Typography, Box} from "@material-ui/core";
import React from "react";

const aboutStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 0,
        paddingTop: 0,
        height: '100vh',
        overflow: "hidden",
    },
    gridContainer: {

    },
    paper: {
        backgroundColor: theme.palette.background.default,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 60,
        paddingBottom: 60
    },
    mainHeading: {
        color: theme.palette.star.main,
        textAlign: "center",
        paddingBottom: 25,
    },
    cardHeading: {
        color: theme.palette.twinkle.main,
        textAlign: "center",
        padding: 5,
    },
    cardBody: {
        color: theme.palette.star.main,
    }
}));

const About = () => {
    const classes = aboutStyles();

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Grid container spacing={3} alignItems={"center"} justify={"space-evenly"} className={classes.gridContainer}>
                <Grid item xs={12}>
                    <Box className={classes.mainHeading}>
                        <Typography variant={"h1"}>
                            The Project
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} variant={"outlined"}  className={classes.paper}>
                        <Box className={classes.cardHeading}>
                            <Typography variant={"h2"}>
                                Volume
                            </Typography>
                        </Box>

                        <Box className={classes.cardBody}>
                            <Typography variant={"body1"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nibh eget lorem consequat tempus ut ac ante. Aliquam semper lacus ut sem semper, at fermentum velit sagittis.
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla tincidunt urna eu sapien egestas, nec congue orci lobortis. Integer eu tellus id sem iaculis cursus a a sapien.
                                Sed finibus suscipit purus sit amet venenatis. Aenean vestibulum porttitor tellus laoreet aliquam. Phasellus gravida mauris at ipsum sodales, sit amet aliquam urna facilisis.
                                Ut porta velit lectus, non rhoncus ante placerat sed. Ut sit amet consectetur nisl, eu sollicitudin massa. Cras.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} variant={"outlined"} className={classes.paper}>
                        <Box className={classes.cardHeading}>
                            <Typography variant={"h2"}>
                                Tokenomics
                            </Typography>
                        </Box>

                        <Box className={classes.cardBody}>
                            <Typography variant={"body1"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id nibh eget lorem consequat tempus ut ac ante. Aliquam semper lacus ut sem semper, at fermentum velit sagittis.
                                Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla tincidunt urna eu sapien egestas, nec congue orci lobortis. Integer eu tellus id sem iaculis cursus a a sapien.
                                Sed finibus suscipit purus sit amet venenatis. Aenean vestibulum porttitor tellus laoreet aliquam. Phasellus gravida mauris at ipsum sodales, sit amet aliquam urna facilisis.
                                Ut porta velit lectus, non rhoncus ante placerat sed. Ut sit amet consectetur nisl, eu sollicitudin massa. Cras.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default About;