import {
    Container,
    makeStyles,
    Grid,
    Divider,
    IconButton
} from "@material-ui/core";
import React from "react";
import DiscordIcon from "./CustomIcons/DiscordIcon";
import TwitterIcon from "./CustomIcons/TwitterIcon";
import {useHistory} from 'react-router-dom';

const aboutStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
    },
    divider: {
        color: theme.palette.rocket.main
    },
    icons: {
        height: 'auto',
        width: '100%',
        color: "white"
    }
}));

const Footer = () => {
    const classes = aboutStyles();

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Divider variant={"fullWidth"} className={classes.divider}/>
            <Grid container xs={12} spacing={2} justify={"space-evenly"}>
                <Grid item xs={1}>
                    <IconButton onClick={() => {
                        // Add discord link
                        window.open('https://discord.gg/CWpavWAyQ2', '_blank');
                    }}>
                        <DiscordIcon className={classes.icons}/>
                    </IconButton>
                </Grid>

                <Grid item xs={1}>
                    <IconButton onClick={() => {
                        // Link to twitter page
                        window.open('https://twitter.com/4FC_Volume', '_blank');
                    }}>
                        <TwitterIcon className={classes.icons}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Footer;