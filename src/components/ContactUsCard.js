import React from "react";
import {makeStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {SOCIALS} from "../constants";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        background: 'linear-gradient(to top, #0A0A0Aaa, #1d0134aa) !important',
        padding: 32,
        letterSpacing: '1px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    socialButton: {
        padding: 8,
        cursor: "pointer",
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const ContactUsCard = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant={"h1"}>
                Want To Learn More?
            </Typography>
            <Typography variant={"subtitle2"}>
                Get in touch! Our team loves answering questions
            </Typography>
            <Box style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: "center"
            }}>
                <IconWithTitle titleText={'Twitter'} svgUrl={'/icons/twitter.svg'} url={SOCIALS.TWITTER}
                               classes={classes}/>
                <IconWithTitle titleText={'Telegram'} svgUrl={'/icons/telegram.svg'} url={SOCIALS.TELEGRAM}
                               classes={classes}/>
                <IconWithTitle titleText={'Discord'} svgUrl={'/icons/discord.svg'} url={SOCIALS.DISCORD}
                               classes={classes}/>
                <IconWithTitle titleText={'Github'} svgUrl={'/icons/github.svg'} url={SOCIALS.GITHUB}
                               classes={classes}/>
            </Box>
            <Typography variant={"body1"}>
                Need a more direct line of communication?
            </Typography>
            <pre style={{marginTop: 8}}>
                <b>Email us at:</b> <a id="email" style={{color: "white"}} href="mailto:contact@volume.quest">contact@volume.quest</a>
            </pre>
        </Card>
    );
};

const IconWithTitle = ({titleText, svgUrl, classes, url, ...rest}) => {
    return (
        <Box className={classes.socialButton} onClick={() => {
            window.open(url, '_blank');
        }}>
            <img src={svgUrl} width={64} height={64}/>
            <Typography variant={'h5'} style={{width: '100%', textAlign: "center"}}>{titleText}</Typography>
        </Box>
    )
}

export default ContactUsCard;