import {
    AppBar,
    Button,
    Divider, Drawer,
    Grid, Hidden, IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useWallet} from "use-wallet";
import {useHistory,useLocation} from 'react-router-dom';
import {ROUTES_NAMES} from "../../constants";
import MenuIcon from "@material-ui/icons/Menu";
import {chainId} from '../../utils/config';
import {User} from "react-feather";

const drawerWidth = 240;

const topBarStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#1d0134",
        flexGrow: 1,
    },
    toolBar: {
        height: 72
    },
    tabs: {
        flexGrow: 1,
    },
    volText: {
        color: theme.palette.twinkle.main,
        fontSize: '1.5em',
    },
    wrongNetText: {
        color: theme.palette.primary.main,
        fontSize: '1em',
    },
    boldText: {
        color: theme.palette.twinkle.main,
        fontWeight: "bold",
        textDecoration: "underline"
    },
    button: {
        padding: '1em',
        marginLeft: '0.5em'
    },
    emptyBar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        opacity: 0.9,
        backgroundColor: "#1d0134"
    },
    drawerListItem: {
        color: theme.palette.twinkle.main,
        paddingLeft: '2em'
    },
    userIcon: {
        color: theme.palette.twinkle.main
    }
}));

const TopBar = ({className, ...rest}) => {
    const classes = topBarStyles();
    const wallet = useWallet();
    const history = useHistory();
    const location = useLocation();
    const locations = [ROUTES_NAMES.HOME,ROUTES_NAMES.JOURNEY,ROUTES_NAMES.REFUEL];

    const [wrongNet, setWrongNet] = useState(false);
    const [address, setAddress] = useState(undefined);

    // ========================== Profile
    const [activeTab ,  setActiveTab] = useState(0);

    useEffect ( () => {
        locations.forEach((loc,index) => {
            if(loc === location.pathname) setActiveTab(index);
        })
    });

    const toHome = () => {
        history.push(ROUTES_NAMES.HOME);
    }

    const toJourney = () => {
        history.push(ROUTES_NAMES.JOURNEY);
    }

    const toRefuel = () => {
        history.push(ROUTES_NAMES.REFUEL);
    }

    useEffect(() => {
        console.log(wallet);
        if (wallet.error && wallet.error.name === "ChainUnsupportedError") {
            setWrongNet(true);
        } else {
            setWrongNet(false);
        }
    }, [wallet.error, wallet.account]);

    useEffect(() => {
        if (wallet.account){
            setAddress(`${wallet.account.slice(0, 6)}...${wallet.account.slice(wallet.account.length-4, wallet.account.length)}`);
            setWrongNet(false);
        }
    }, [wallet.account]);

    // ========================== Mobile optimization
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
        history.push(locations[newValue]);
    }

    const drawer = (
        <div>
            <div className={classes.emptyBar}/>
            <Divider />
            <List>
                <ListItem button key={'Home'} onClick={toHome}>
                    <ListItemText primary={'Home'} className={classes.drawerListItem}/>
                </ListItem>
                <ListItem button key={'Journey'} onClick={toJourney}>
                    <ListItemText primary={"The Journey"} className={classes.drawerListItem}/>
                </ListItem>
                <ListItem button key={'Refuel'} onClick={toRefuel}>
                    <ListItemText primary={"Refuel"} className={classes.drawerListItem}/>
                </ListItem>
            </List>
            <Divider />
            <Grid container>
                {
                    wrongNet &&
                    <Grid container item xs={12} justify={"center"}>
                        <Button variant={"outlined"} className={classes.button} style={{marginTop: '0.5em'}}>
                            <Typography variant={"body1"} className={classes.wrongNetText}>
                                Wrong Network
                            </Typography>
                        </Button>
                    </Grid>
                }

                <Grid container item xs={12} justify={"center"}>
                    <Button variant={"text"} className={classes.button} style={{marginTop: '0.5em'}} onClick={() => {
                        if (wallet.status !== 'connected')
                            wallet.connect();
                    }}>
                        {wallet.status === 'connected' && <User className={classes.userIcon}/>}
                        <Typography variant={"h4"} className={classes.volText}>
                            {
                                wallet.status === 'connected'
                                    ? address
                                    : 'Connect'
                            }
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
    // ==========================

    return (
        <div>
            <AppBar
                position={"fixed"}
                color={"primary"}
                className={clsx(classes.root, className)}
                {...rest}
            >
                <Toolbar className={classes.toolBar}>
                    <Hidden mdUp>
                        <IconButton className={classes.button} onClick={() => {
                            setMobileOpen(true);
                        }}>
                            <MenuIcon className={classes.volText}/>
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" className={classes.volText}>
                        Volume
                    </Typography>
                    <Hidden smDown>
                        <Tabs value={activeTab} onChange={handleChange} className={classes.tabs}>
                            <Tab label="Home"/>
                            <Tab label="The Journey"/>
                            <Tab label="Direct Refuel" />
                        </Tabs>

                        {
                            wrongNet &&
                            <Button variant={"outlined"} className={classes.button}>
                                <Typography variant={"body1"} className={classes.wrongNetText}>
                                    Wrong Network
                                </Typography>
                            </Button>
                        }


                        <Button variant={"text"} className={classes.button} onClick={() => {
                            if (wallet.status !== 'connected')
                                wallet.connect();
                            else {
                                // open profile
                                history.push(ROUTES_NAMES.USER_PROFILE);
                            }
                        }}>
                            {wallet.status === 'connected' && <User className={classes.userIcon}/>}
                            <Typography variant={"h4"} className={classes.volText}>
                                {
                                    wallet.status === 'connected'
                                        ? address
                                        : 'Connect'
                                }
                            </Typography>
                        </Button>

                    </Hidden>
                </Toolbar>
            </AppBar>

            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={"left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>

    );
}

export default TopBar;