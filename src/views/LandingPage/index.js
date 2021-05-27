import Page from "../../components/Page";
import {Container, makeStyles} from "@material-ui/core";
import Anime from "react-anime"
import {useEffect, useState} from "react";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    },
    star: {
        height: 50,
        width: 50,

    },
    rocket: {
        height: 300,
        top: '50vh',
        left: '20%',
        position: "absolute"
    },
}));

const LandingPage = () => {
    const classes = landingStyles();

    const [init, setInit] = useState(false);
    const [delays, setDelays] = useState([]);

    useEffect(() => {
        if (!init) {
            // Generate random delays
            const tempDelays = [];
            for (let i = 0; i < 20; i++) {
                const delay = Math.floor(Math.random() * 5000);
                tempDelays.push(delay);
            }
            setDelays(tempDelays);

            // init true
            setInit(true);
        }
    }, [init]);

    return (
        <Page
            classname={classes.root}
            title={'Home'}
        >
            <Container
                className={classes.universeBackground
                }
                maxWidth={"xl"}
            >
                {
                    init &&
                    <div>
                        {/*Stars*/}
                        {
                            delays.map((d) => {
                                return (
                                    <div style={{width: '100%'}}>
                                        <Anime
                                            translateX={['110%', '-10%']}
                                            loop={true}
                                            duration={5000}
                                            delay={d}
                                            easing={"linear"}
                                        >
                                            <img src={"/star.svg"} alt={"star"} className={classes.star}/>
                                        </Anime>
                                    </div>
                                );
                            })
                        }
                        {/*End of Stars*/}

                        <img src={"/rocket.svg"} alt={"rocket"} className={classes.rocket}/>
                    </div>
                }
            </Container>
        </Page>
    )
}

export default LandingPage;