import {
    AppBar,
    Button,
    Divider, Drawer,
    Hidden, IconButton,
    makeStyles,
    Toolbar
} from "@material-ui/core";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useWallet, ChainUnsupportedError} from "use-wallet";
import {useHistory, useLocation} from 'react-router-dom';
import {ROUTES_NAMES} from "../../constants";
import MenuIcon from "@material-ui/icons/Menu";
import {chainId, kovanChainId} from '../../utils/config';
import {User} from "react-feather";
import {useSnackbar} from 'notistack';

import LogoWithText from '../../components/LogoWithText'
import useVolume from "../../hooks/useVolume";
import App from "../../App";

const drawerWidth = 240;

const topBarStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#1d0134",
        flexGrow: 1,
        borderBottom: '1px solid #373737',
    },
    toolBar: {
        height: '100%',
        justifyContent: 'space-between'
    },
    tabs: {
        flexGrow: 1,
        marginLeft: '2em'
    },
    volText: {
        color: theme.palette.twinkle.main,
        fontSize: '1.1em',
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
        padding: '0.5em',
        color: 'white',
        borderRadius: '20px',
        minWidth: 150,
        marginLeft: '10px',
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
    },
    flewGrow: {
        flexGrow: 1
    }
}));

const TopBar = ({className, ...rest}) => {
    const classes = topBarStyles();
    const wallet = useWallet();
    const history = useHistory();
    const location = useLocation();
    const volume = useVolume();

    const [lastToast, setLastToast] = useState(0);
    const [wrongNet, setWrongNet] = useState(false);

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (wallet.error instanceof ChainUnsupportedError) {
            if (lastToast === 0 || performance.now() - lastToast > 5000) {
                enqueueSnackbar(`Unsupported network Volume is only available on ${wallet.networkName} chainId (${chainId})`, {variant: 'error'});
                setLastToast(performance.now());
            }
            setWrongNet(true);
        } else {
            setWrongNet(false);
        }
        if (volume.setWallet)
            volume.setWallet(wallet);
    }, [wallet])


    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }


    const handleChange = (event, newValue) => {
        history.push(newValue);
    }

    const drawer = (
        <div style={{paddingTop: '0.5em',}}>
            <LogoWithText/>
            <Divider style={{marginTop: '1em'}}/>
            <Tabs value={location.pathname} onChange={handleChange} className={classes.tabs} orientation={'vertical'}>
                <Tab label="Dashboard" value={ROUTES_NAMES.DASHBOARD} className={classes.tabsEntries}/>
                <Tab label="The Journey" value={ROUTES_NAMES.JOURNEY}/>
                <Tab label="Direct Refuel" value={ROUTES_NAMES.REFUEL}/>
                <Tab label="NFT Market" value={ROUTES_NAMES.NFT_MARKET}/>
                {/* BETA */}
                {
                    wallet.status === 'connected' && wallet.chainId ? kovanChainId &&
                        <Tab label="Faucet" value={ROUTES_NAMES.FAUCET}/> : <></>
                }
            </Tabs>
            <Divider/>
        </div>
    );

    return (
        <div>
            <AppBar
                position={"fixed"}
                color={"primary"}
                className={clsx(classes.root, className)}
                {...rest}
            >
                <Toolbar className={classes.toolBar}>
                    <Hidden mdUp className={classes.flewGrow}>
                        <IconButton onClick={() => {
                            setMobileOpen(true);
                        }}>
                            <MenuIcon className={classes.volText}/>
                        </IconButton>
                    </Hidden>

                    <Hidden smDown>
                        <LogoWithText/>
                        <Tabs value={location.pathname} onChange={handleChange} className={classes.tabs}>
                            <Tab label="Dashboard" value={ROUTES_NAMES.DASHBOARD}/>
                            <Tab label="The Journey" value={ROUTES_NAMES.JOURNEY}/>
                            <Tab label="NFT Market" value={ROUTES_NAMES.NFT_MARKET}/>
                            <Tab label="Direct Refuel" value={ROUTES_NAMES.REFUEL}/>
                            {/* BETA */}
                            {
                                wallet.status === 'connected' && wallet.chainId ? kovanChainId &&
                                    <Tab label="Faucet" value={ROUTES_NAMES.FAUCET}/> : <></>
                            }
                        </Tabs>
                    </Hidden>
                    {
                        wrongNet &&
                        <Button variant={"outlined"} className={classes.button}>
                            <Typography variant={"body1"} className={classes.wrongNetText}>
                                Wrong Network
                            </Typography>
                        </Button>
                    }
                    <Button variant={"contained"} color={'secondary'} className={classes.button} onClick={() => {
                        if (wallet.status !== 'connected') {
                            wallet.connect();
                            setLastToast(0);
                        } else {
                            // open profile
                            history.push(ROUTES_NAMES.USER_PROFILE);
                        }
                    }}>
                        <User/>
                        <Typography variant={"subtitle1"} style={{fontSize: '0.9em'}}>
                            {
                                wallet.status === 'connected' && wallet.account
                                    ? `${wallet.account.slice(0, 6)}...${wallet.account.slice(wallet.account.length - 4, wallet.account.length)}`
                                    : 'Connect Wallet'
                            }
                        </Typography>
                    </Button>
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