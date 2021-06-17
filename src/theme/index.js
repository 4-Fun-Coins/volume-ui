import _ from 'lodash';
import {colors, unstable_createMuiStrictModeTheme as createMuiTheme, responsiveFontSizes} from '@material-ui/core';
import {THEMES} from '../constants';
import {softShadows} from './shadows';
import typography from './typography';

const baseOptions = {
    direction: 'ltr',
    typography,
    overrides: {
        MuiLinearProgress: {
            root: {
                borderRadius: 3,
                overflow: 'hidden'
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 32
            }
        },
        MuiChip: {
            root: {
                backgroundColor: 'rgba(0,0,0,0.075)'
            }
        }
    }
};

const themesOptions = [
    {
        name: THEMES.DARK,
        overrides: {
            MuiInputBase: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: colors.blueGrey[600]
                    }
                }
            }
        },
        palette: {
            type: 'dark',
            action: {
                active: colors.blueGrey[600]
            },
            background: {
                default: "#0A0A0A",
            },
            primary: {
                main: "#D33E43"
            },
            secondary: {
                main: "#f18b2c"
            },
            flame: {
                main: "#f18b2c"
            },
            star: {
                main: "#F8F8F8"
            },
            twinkle: {
                main: '#F5BC00'
            },
            rocket: {
                main: '#A1A1A1'
            },
            text: {
                subHeading: '#f1076e',
                text: '#2f50b9',
                subText: '#94cffa',
                paragraph: '#e8c9ff'
            }
        },
        shadows: softShadows
    }
];

export const createTheme = (config = {}) => {
    let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

    if (!themeOptions) {
        console.warn(new Error(`The theme ${config.theme} is not valid`));
        [themeOptions] = themesOptions;
    }

    let theme = createMuiTheme(
        _.merge(
            {},
            baseOptions,
            themeOptions,
            {direction: config.direction}
        )
    );

    if (config.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return theme;
};

export const theme = () => {
    return themesOptions;
};
