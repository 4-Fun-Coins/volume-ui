import {
    Box,
    Button,
    Container,
    Grid,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import React, {useRef} from "react";
import {ROUTES_NAMES} from "../../constants";

const heroStyles = makeStyles((theme) => ({
    root: {
        padding: '8px',
        marginTop: 72
    },
    titles: {
        color: theme.palette.twinkle.main,
        padding: '8px',
        width: '100%',
        textAlign: 'center'
    },
    body: {
        //color : theme.palette.text.paragraph,
        padding: '8px',
        textAlign: 'justify',
        fontSize: '1.1em',
        color: '#d0d0d0'
    },
    BigTitles: {
        color: theme.palette.twinkle.main,
        padding: '8px',
        width: '100%',
        textAlign: 'center',
        fontSize: '6em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '4rem',
        }
    },
    BigBody: {
        marginTop: '12px',
        textAlign: 'justify',
        lineHeight: '1.4em',
        fontSize: '1.5em',
        fontWeight: 350,
        color: '#d5d5d5',
        letterSpacing: '1px',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontWeight: 350,
            fontSize: '1.25rem',
            letterSpacing: '1px',
        }
    },
    button: {
        minWidth: '200px',
        marginTop: '24px',
        color: 'white',
        fontSize: '1.2em',
        borderRadius: '50px',
        transition: 'all .5s ease-in-out',
        '&:hover': {
            transform: 'scale(1.12)',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            minWidth: '130px',
            fontSize: '1em',
        }
    }
}));

const Hero = ({reverse}) => {
    const classes = heroStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    const hero2 = useRef(null);

    const executeScroll = () => hero2.current.scrollIntoView();

    return (
        <Container maxWidth={'lg'} className={classes.root}>
            <Grid container direction={reverse ? 'row-reverse' : 'row'} alignContent={'center'} alignItems={'center'}
                  style={{minHeight: '100vh'}}>

                <Grid item xs={12} md={6} justifyContent={'center'} style={{textAlign: 'center'}}>
                    <Typography variant={'h1'} className={classes.BigTitles}>
                        Volume
                    </Typography>
                    <Typography variant={'h1'} className={classes.BigBody}>
                        Volume is an NFT- and decentralized gaming project built on the Polygon Network. Crew members need
                        to supply fuel to the Volume rocket for it to reach as many milestones as possible. Crew members
                        can easily keep track of their stats on the dashboard. Upon reaching a new milestone all crew members that
                        participated will receive a celebratory NFT and top refuellers will receive an additional Volume airdrop.
                        If you have any questions not answered below, please join our discord to have them answered!
                    </Typography>
                    <Box style={{width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '0.8em'}}>
                        <Button color={"primary"} variant={'contained'} size={'large'} className={classes.button}> Buy
                            $VOL</Button>
                        <Button color={"secondary"} variant={'contained'} size={'large'} className={classes.button}
                                onClick={executeScroll}> Learn More</Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} alignItems={'center'} alignContent={'center'} justifyContent={'center'}
                      style={{textAlign: 'right'}}>
                    {!isMobile &&
                    <img src={'/explorer.webp'} alt={'logo'} height={500} width={358}
                         style={{border: '6px double #522D82'}}/>}
                </Grid>
            </Grid>
            <div ref={hero2} style={{marginBottom: '4em', marginTop: '2em'}}/>
        </Container>
    )
}

export default Hero;