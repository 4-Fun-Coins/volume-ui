import {
    Box,
    Container,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import {cardStyles} from "../Cards";
import Card from '@material-ui/core/Card';


const featuresStyles = makeStyles((theme) => ({
    root: {
        padding: '8px',
    },
    BigTitles: {
        color: theme.palette.twinkle.main,
        padding: '8px',
        width: '100%',
        textAlign: 'center',
        fontSize: '5em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '3.5rem',
        }
    },
    BigBody: {
        //color : theme.palette.text.paragraph,
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
}));

const features = [
    {
        path: 'decentralized',
        title: 'Decentralized',
        description: 'Volume uses some of the most secure blockchain- and decentralized file storage technologies like the Binance Smart Chain and IPFS to provide a decentralized ecosystem that can never be taken down or blacklisted. All contracts and NFTs are here to stay forever'
    },
    {
        path: 'deflationary',
        title: 'Deflationary',
        description: 'Volume burns a small portion of each transaction, reducing the total supply on each transaction. Volume will also be burning $Vol tokens on each new NFT sale, in the lottery and in mini-games. This will help keep the Volume rocket flying and the Volume price rising'
    },
    {
        path: 'trustless',
        title: 'Trustless',
        description: 'The Volume ecosystem is built using the latest smart contract standards. $VOL liquidity is provided and guaranteed by the ecosystem, built with a trustless mentality from the ground up means the Volume community can use the ecosystem in a trustless way'
    },
    {
        path: 'community',
        title: 'Community Driven',
        description: 'The Volume ecosystem is built for the community, meaning that the community will decide on the faith and the future of the Volume ecosystem, at the start all governance will be done via a snapshot vote but later-on Volume will move to a complete DAO'
    },
    {
        path: 'fun',
        title: 'Fun & Informative',
        description: 'The Volume ecosystem was made to be a fun and informative project where users will learn about Crypto, tokenomics and space via a variety of services, games, NFTs and special events. It will also have plenty of rewards for the whole community'
    },
    {
        path: 'extensible',
        title: 'Extensible',
        description: 'Volume was built with extensibility in mind - we have plans to make an "open API contract" that our community members can plug into to create mini-games within the Volume ecosystem'
    },
]


const Features = ({}) => {
    const classes = featuresStyles();
    return (
        <Container maxWidth={'lg'} className={classes.root}>
            <Grid container direction={'column'} spacing={2}>
                <Grid item>
                    <Typography variant={"h1"} className={classes.BigTitles}>
                        Features
                    </Typography>
                </Grid>
                <Grid item container spacing={3} justifyContent={'center'} style={{textAlign: 'center'}}>
                    {features.map((element, index) => {
                        return <Grid item xs={12} sm={6} md={4} container>
                            <FeatureCard key={index} {...element} index={index}/>
                        </Grid>
                    })}
                </Grid>
            </Grid>
            <div style={{margin: '6em'}}/>
        </Container>
    )
}

const FeatureCard = ({path, title, description, index, ...rest}) => {
    const colors = ['#4558DC', '#FA5049', '#FFCCAC', '#FEE475', '#08D5CC', '#6ABFF6'];
    const FeatureCardStyles = makeStyles((theme) => ({
        svg0: {
            filter: 'invert(28%) sepia(48%) saturate(4629%) hue-rotate(228deg) brightness(92%) contrast(87%);',
        },
        svg1: {
            filter: 'invert(47%) sepia(29%) saturate(5839%) hue-rotate(330deg) brightness(98%) contrast(102%);',
        },
        svg2: {
            filter: 'invert(89%) sepia(73%) saturate(7491%) hue-rotate(295deg) brightness(111%) contrast(106%);',
        },
        svg3: {
            filter: 'invert(77%) sepia(66%) saturate(319%) hue-rotate(355deg) brightness(104%) contrast(103%);',
        },
        svg4: {
            filter: 'invert(66%) sepia(22%) saturate(2953%) hue-rotate(129deg) brightness(98%) contrast(94%);',
        },
        svg5: {
            filter: 'invert(64%) sepia(66%) saturate(576%) hue-rotate(176deg) brightness(102%) contrast(93%);',
        },
        titleText: {
            color: 'white',
            letterSpacing: '1px',
        },
        descriptionText: {
            fontSize: '16px',
            letterSpacing: '1px',
            lineHeight: '1.5em',
            textAlign: 'justify',
            color: '#d0d0d0'
        },
        responsiveMargin: {
            margin: '24px',
            [theme.breakpoints.between('xs', 'sm')]: {
                margin: '12px'
            }
        }
    }));
    const classes = FeatureCardStyles();
    const cardClasses = cardStyles();

    return (
        <Card style={{width: '100%', fontFamily: 'unset', borderBottom: `8px solid ${colors[index]}`}}
              className={cardClasses.cardGrid}>
            <Box style={{margin: '24px'}}>
                <img src={`/icons/${path}.svg`} width={'110'} height={'110'} alt={'logo'}
                     className={classes[`svg${index}`]}/>
            </Box>
            <Box>
                <Typography variant={'h2'} className={classes.titleText}>{title}</Typography>
            </Box>
            <Box style={{margin: '24px'}}>
                <Typography variant={"body1"} className={classes.descriptionText}>{description}</Typography>
            </Box>
        </Card>
    )
}
export default Features;