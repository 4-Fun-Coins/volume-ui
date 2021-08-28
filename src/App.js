import {create} from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import {SnackbarProvider} from 'notistack';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import GlobalStyles from './components/Root/GlobalStyles';
import {makeStyles} from "@material-ui/core";
import useSettings from './hooks/useSettings';
import {createTheme} from './theme';
import routes, {renderRoutes} from './routes';
import {HashRouter} from 'react-router-dom';
import NewSpace from "./components/Root/NewSpace";
import MainLayout from './layout/MainLayout';
import {VolumeProvider} from "./contexts/VolumeContext";

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const appStyles = makeStyles((theme) => ({
    universeBackground: {
        position: "fixed",
        top: '60',
        zIndex: -1,
        filter: 'blur(3px)'
    },
}));

const App = () => {
    const {settings} = useSettings();
    const classes = appStyles();

    const theme = createTheme({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        theme: settings.theme
    });

    return (
        <ThemeProvider theme={theme}>
            <StylesProvider jss={jss}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <SnackbarProvider
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        dense
                        maxSnack={3}
                    >
                        <VolumeProvider>

                            <HashRouter>
                                <GlobalStyles/>
                                <div className={classes.universeBackground}>
                                    <NewSpace/>
                                </div>
                                <MainLayout>
                                    {renderRoutes(routes)}
                                </MainLayout>
                            </HashRouter>
                        </VolumeProvider>

                    </SnackbarProvider>
                </MuiPickersUtilsProvider>
            </StylesProvider>
        </ThemeProvider>
    );
};
export default App;
