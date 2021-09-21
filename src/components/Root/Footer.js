import {
    Container,
    makeStyles,
    Grid,
    Divider,
    IconButton
} from "@material-ui/core";
import React from "react";
import DiscordIcon from "../CustomIcons/DiscordIcon";
import TwitterIcon from "../CustomIcons/TwitterIcon";
import GitHubIcon from "../CustomIcons/GitHubIcon";
import TelegramIcon from "../CustomIcons/TelegramIcon";

const aboutStyles = makeStyles((theme) => ({
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
            maxWidth={false}
        >
            <Divider variant={"fullWidth"} className={classes.divider}/>
            <Grid container spacing={2} justifyContent={"space-around"}>
                <Grid item xs={3} sm={3} md={1}>
                    <IconButton onClick={() => {
                        // Add discord link
                        window.open('https://discord.gg/WEgUEzYU4M', '_blank');
                    }}>
                        <DiscordIcon className={classes.icons}/>
                    </IconButton>
                </Grid>

                <Grid item xs={3} sm={3} md={1}>
                    <IconButton onClick={() => {
                        // Add discord link
                        window.open('https://t.me/VolumeCoin', '_blank');
                    }}>
                        <TelegramIcon className={classes.icons}/>
                    </IconButton>
                </Grid>

                <Grid item xs={3} sm={3} md={1}>
                    <IconButton onClick={() => {
                        // Link to twitter page
                        window.open('https://twitter.com/4FC_Volume', '_blank');
                    }}>
                        <TwitterIcon className={classes.icons}/>
                    </IconButton>
                </Grid>

                <Grid item xs={3} sm={3} md={1}>
                    <IconButton onClick={() => {
                        // Link to twitter page
                        window.open('https://github.com/4-Fun-Coins', '_blank');
                    }}>
                        <GitHubIcon className={classes.icons}/>
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Footer;