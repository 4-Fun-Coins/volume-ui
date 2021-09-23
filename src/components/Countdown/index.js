import React, {useEffect, useState} from "react";
import {getFormattedTimePeriod} from "../../utils/Utilities";
import {makeStyles, useMediaQuery, useTheme} from "@material-ui/core";
import LoadingScreen from "../LoadingScreen";
import {themeColors} from "../../data/static/Colors";

const mdScale = 0.80;
const xsScale = 0.5;

const useStyles = makeStyles((theme) => ({
    countDownTitle: {
        letterSpacing: '2px',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: '40px',
        marginBottom: '50px',
    },
    countdownWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    countdownItem: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '0px',
        paddingTop: '10px',
        position: 'relative',
        fontWeight: 700,
        fontSize: '80px',
        lineHeight: '60px',
        width: '240px',
        height: '240px',
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: Math.floor(80 * mdScale) + 'px',
            lineHeight: Math.floor(60 * mdScale) + 'px',
            width: Math.floor(240 * mdScale) + 'px',
            height: Math.floor(240 * mdScale) + 'px',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: Math.floor(80 * xsScale) + 'px',
            lineHeight: Math.floor(60 * xsScale) + 'px',
            width: Math.floor(240 * xsScale) + 'px',
            height: Math.floor(240 * xsScale) + 'px',
        }
    },
    countdownItemSpan: {
        fontSize: '24px',
        fontWeight: 600,
        textTransform: 'uppercase',
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: Math.floor(24 * mdScale) + 'px',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: Math.floor(24 * xsScale) + 'px',
        }
    },
    countdownSvg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '240px',
        height: '240px',
        transition: '1s',
        zIndex: '-1',
        [theme.breakpoints.between('md', 'lg')]: {
            width: Math.floor(240 * mdScale) + 'px',
            height: Math.floor(240 * mdScale) + 'px',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            width: Math.floor(240 * xsScale) + 'px',
            height: Math.floor(240 * xsScale) + 'px',
        }
    },
    animated: {
        '-webkit-animation': '$fadein 3s',
        '-moz-animation': '$fadein 3s',
        '-ms-animation': '$fadein 3s',
        '-o-animation': '$fadein 3s',
        animation: '$fadein 3s',
    },

    '@keyframes fadein': {
        from: {opacity: 0},
        to: {opacity: 1}
    },
    '@-moz-keyframes fadein': {
        from: {opacity: 0},
        to: {opacity: 1}
    },
    '@-webkit-keyframes fadein': {
        from: {opacity: 0},
        to: {opacity: 1}
    },
    '@-ms-keyframes fadein': {
        from: {opacity: 0},
        to: {opacity: 1}
    },
    '@-o-keyframes fadein': {
        from: {opacity: 0},
        to: {opacity: 1}
    }
}));

export const CountDown = ({endDate, unitColor, bgColor, ...rest}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    const classes = useStyles();


    const [time, setTime] = useState({
        months: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    });

    useEffect(() => {
        const setIt = () => {
            const countdown = endDate - Date.now();
            setTime(getFormattedTimePeriod(countdown));
        };

        setIt();
        const interval = setInterval(() => {
            setIt();
        }, 1000);
        return function cleanup() {
            if (interval) {
                console.info('Clearing interval');
                clearInterval(interval);
            }
        };
    }, []);


    // see: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    const SVGCircle = ({radius}) => {
        const scale = isMedium ? mdScale : (isMobile ? xsScale : 1);
        return (
            <svg className={classes.countdownSvg}>
                <circle cx={120 * scale} cy={120 * scale} r={108 * scale} stroke={"none"} strokeWidth={3 * scale}
                        fill={bgColor ? bgColor : 'none'}/>
                <path fill="none" stroke={themeColors.twinkle.main} strokeWidth={18 * scale}
                      d={describeArc(120 * scale, 120 * scale, 100 * scale, 0, 360 - radius)}/>
            </svg>
        )
    };

    const UnitItem = (unitName, count, inMin, inMax, outMin, outMax) => {
        return (
            <div className={classes.countdownItem}>
                <SVGCircle radius={mapNumber(count, inMin, inMax, outMin, outMax)}/>
                {count >= 10 ? count : '0' + count}
                <span className={classes.countdownItemSpan}
                      style={{color: unitColor ? unitColor : 'orange'}}>{unitName}</span>
            </div>
        )
    };

    return (
        <React.Fragment>
            {(time.seconds || time.seconds === 0) ?
                <div className={classes.countdownWrapper + ' animated'} {...rest}>
                    {(time.months || time.months === 0) && (
                        UnitItem('months', time.months, 12, 0, 0, 360)
                    )}
                    {(time.days || time.days === 0) && (
                        UnitItem('days', time.days, 30, 0, 0, 360)
                    )}
                    {(time.hours || time.hours === 0) && (
                        UnitItem('hours', time.hours, 24, 0, 0, 360)
                    )}
                    {(time.minutes || time.minutes === 0) && (
                        UnitItem('minutes', time.minutes, 60, 0, 0, 360)
                    )}
                    {(time.seconds || time.seconds === 0) && (
                        UnitItem('seconds', time.seconds, 60, 0, 0, 360)
                    )}
                </div>
                : <LoadingScreen transparent {...rest}/>}
        </React.Fragment>
    )
};

// see: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// see: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}


// see: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}