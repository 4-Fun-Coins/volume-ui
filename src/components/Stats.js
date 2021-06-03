import {
    Box,
    Button, ButtonBase,
    Container,
    createMuiTheme,
    Divider,
    Grid, IconButton,
    makeStyles,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getStats} from "../utils/stats";
import {Search} from "@material-ui/icons";
import LoadingScreen from "./LoadingScreen";

const statsStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    },
    walletField: {
        width: '50%',
        marginTop: "2em",
    },
    submitButton: {
        marginTop: "2.2em",
        height: '100',
        marginLeft: "0.5em"
    },
    statsWrapper: {
        marginTop: "2em",
        borderWidth: "1px",
        borderColor: "gray",
        borderStyle: "solid",
        padding: "1em"
    },
    subtitle: {
        color: theme.palette.star.main
    }
}));

const Stats = () => {
    const classes = statsStyles();

    const [initLogs, setInitLogs] = useState(false);

    const [loadingStats, setLoadingStats] = useState(false);
    const [initStats, setInitStats] = useState(true);

    useEffect(() => {
        if (!initLogs) {
            getStats().then(res => {
                console.log(res);
                setInitLogs(true);
            });
        }
    }, [initLogs]);

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Grid container>

                <Grid container item justify={"center"}>
                    <Typography variant={"h1"} style={{color: "white"}}>
                        STATISTICS
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item justify={"center"} sm={12} direction={"row"}>
                <TextField
                    className={classes.walletField}
                    label={"Wallet Address"}
                    variant={"outlined"}
                    color={"secondary"}
                />

                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    startIcon={<Search style={{marginLeft: '0.5em'}}/>}
                    className={classes.submitButton}
                    onClick={async () => {
                        setLoadingStats(true);

                        // Fetch the stats here
                        const res = await getStats();
                        // TODO - assign stats from res

                        // Set loading stats to false & initStats to true
                        setLoadingStats(false);
                    }}
                />
            </Grid>

            <Grid container item justify={"center"}>
                {initStats && !loadingStats &&
                    <Grid container item className={classes.statsWrapper} sm={6} spacing={2}>
                        {/*Global stats*/}
                        <Grid container item sm={12} justify={"center"}>
                            <Box className={classes.subtitle}>
                                <Typography variant={"h3"}>
                                    Global Stats
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Total fuel added (blocks):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                15 blocks
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Est time added (seconds):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                75 seconds
                            </Typography>
                        </Grid>

                        <Grid item sm={12}>
                            <Divider light={true}/>
                        </Grid>

                        {/*User stats*/}
                        <Grid container item sm={12} justify={"center"}>
                            <Box className={classes.subtitle}>
                                <Typography variant={"h3"}>
                                    Personal Stats
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Your fuel added (blocks):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                15 blocks
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Est time added (seconds):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                75 seconds
                            </Typography>
                        </Grid>

                    </Grid>
                }
                {
                    loadingStats &&
                        <LoadingScreen transparent/>
                }
            </Grid>


        </Container>
    )
}

export default Stats;