import Page from "../../components/Page";
import {Container, Divider, makeStyles, Typography} from "@material-ui/core";
import Anime from "react-anime";
import {useEffect, useState} from "react";
import About from "../../components/About";
import Stats from "../../components/Stats";
import Footer from "../../components/Footer";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    star: {
        height: '2%',
        width: '2%',
    },
    planet: {
        height: '6%',
        width: '6%'
    },
    rock: {
        height: '3%',
        width: '3%'
    },
    rocket: {
        height: '27%',
        width: '27%',
        top: '50vh',
        left: '20%',
        position: "absolute"
    },
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        backgroundImage: `url(/spaceDust.svg)`,
        backgroundSize: "cover",
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    },
    aboutBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
    },
    statsBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
    },
    footerBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
    }
}));

const LandingPage = () => {
    const classes = landingStyles();

    const [init, setInit] = useState(false);
    const [delays, setDelays] = useState([]);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        if (!init) {
            // Generate random delays
            const tempDelays = [];
            for (let i = 0; i < 20; i++) {
                const delay = Math.floor(Math.random() * 10000 + 1000);
                tempDelays.push(delay);
            }
            setDelays(tempDelays);

            // Generate random elements
            const tempElements = [];
            let rock = false;
            let planet1 = false;
            let planet2 = false;
            let planet3 = false;
            let planet4 = false;
            let planet5 = false;

            for (let i = 0; i < 20; i++) {
                const element = Math.floor(Math.random() * 6 + 1);

                switch(element) {
                    case 1: {
                        // rock
                        if (!rock) {
                            tempElements.push(1);
                            rock = true;
                        }
                    else
                        tempElements.push(1);
                        break;
                    }

                    case 2: {
                        // planet1
                        if (!planet1) {
                            tempElements.push(2);
                            planet1 = true;
                        }
                        else
                            tempElements.push(1);
                        break;
                    }

                    case 3: {
                        // planet2
                        if (!planet2) {
                            tempElements.push(3);
                            planet2 = true;
                        }
                        else
                            tempElements.push(0);
                        break;
                    }

                    case 4: {
                        // planet3
                        if (!planet3) {
                            tempElements.push(4);
                            planet3 = true;
                        }
                        else
                            tempElements.push(0);
                        break;
                    }

                    case 5: {
                        // planet4
                        if (!planet4) {
                            tempElements.push(5);
                            planet4 = true;
                        }
                        else
                            tempElements.push(0);
                        break;
                    }

                    case 6: {
                        // planet5
                        if (!planet5) {
                            tempElements.push(6);
                            planet5 = true;
                        }
                        else
                            tempElements.push(0);
                        break;
                    }
                }
            }
            setElements(tempElements);

            // init true
            setInit(true);
        }
    }, [init]);

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container
                className={classes.universeBackground}
                maxWidth={false}
            >
                {
                    init &&
                    <div>
                        {/*Stars*/}
                        {
                            delays.map((d, index) => {
                                return (
                                    <div style={{width: '100%', position: 'relative'}} key={d}>
                                        <Anime
                                            translateX={['110%', '-10%']}
                                            loop={true}
                                            duration={d}
                                            /**
                                            * Alternative if you want to make it more 'realistic' - rocks fast & planets slow

                                                duration={elements[index] === 0 ? 3500 :
                                                    (elements[index] === 1 ? 2000 :
                                                        40000)}

                                            */
                                            delay={d}
                                            easing={"linear"}
                                        >
                                            <img src={
                                                elements[index] === 0 ? "/double_rock.png" :
                                                    (elements[index] === 1 ? "/rock3.png" :
                                                        (elements[index] === 2 ? '/blue_planet.png' :
                                                            (elements[index] === 3 ? '/planet_red.svg' :
                                                                (elements[index] === 4 ? 'deep_red_planet.png' :
                                                                    (elements[index] === 5 ? 'pink_planet.png' : 'orange_planet.png')))))}
                                                 alt={"star"} className={
                                                    elements[index] === 0 ? classes.star :
                                                        (elements[index] === 1 ? classes.rock :
                                                            classes.planet)}/>
                                        </Anime>
                                    </div>
                                );
                            })
                        }
                        {/*End of Stars*/}

                        <img src={"/rocket_tilted.svg"} alt={"rocket"} className={classes.rocket}/>
                    </div>
                }
            </Container>

            <Container
                maxWidth={false}
                className={classes.aboutBackground}
            >
                <About/>
            </Container>

            <Container
                maxWidth={false}
                className={classes.statsBackground}
            >
                <Stats/>
            </Container>

            <Container
                maxWidth={false}
                className={classes.footerBackground}
            >
                <Footer/>
            </Container>
        </Page>
    )
}

export default LandingPage;