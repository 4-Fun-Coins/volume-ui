import React, {useEffect} from 'react';
import {createBrowserHistory} from 'history';
import {create} from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import {SnackbarProvider} from 'notistack';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import GlobalStyles from './components/GlobalStyles';
import {makeStyles} from "@material-ui/core";
import useSettings from './hooks/useSettings';
import {createTheme} from './theme';
import routes, {renderRoutes} from './routes';
import {HashRouter} from 'react-router-dom';
import CookiesNotification from "./components/CookiesNotification";
import NewSpace from "./components/NewSpace";

const jss = create({plugins: [...jssPreset().plugins, rtl()]});
const history = createBrowserHistory();

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
              <HashRouter history={history}>
                <GlobalStyles/>
                <CookiesNotification/>
                <div className={classes.universeBackground}>
                            <NewSpace />
                </div>
                {renderRoutes(routes)}
              </HashRouter>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </ThemeProvider>
  );
};
export default App;
