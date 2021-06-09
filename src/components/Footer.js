import {Container, makeStyles, Grid, Paper, Typography, Box} from "@material-ui/core";
import React from "react";

const aboutStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
    },

}));

const Footer = () => {
    const classes = aboutStyles();

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Grid container>

            </Grid>

        </Container>
    );
}

export default Footer;