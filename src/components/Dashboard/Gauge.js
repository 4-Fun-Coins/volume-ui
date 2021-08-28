import {arc} from "d3-shape";
import {scaleLinear} from "d3-scale";
import {format} from "d3-format";
import {Grid} from "@material-ui/core";
import Countdown from "react-countdown";
import React from "react";

const Gauge = ({
    value= 50,
    min= 0,
    max= 100,
    label,
    units,
    date,
    innerRadius = 0.8,
    outerRadius = 1,
    startAngle = -Math.PI / 2,
    endAngle = Math.PI / 2
}) => {

    const backgroundArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .cornerRadius(1)();

    const percentScale = scaleLinear()
        .domain([min, max])
        .range([0, 1]);

    const percent = percentScale(value);

    const angleScale = scaleLinear()
        .domain([0, 1])
        .range([-Math.PI / 2, Math.PI / 2])
        .clamp(true);

    const angle = angleScale(percent);

    const filledArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(angle)
        .cornerRadius(1)();

    const colorScale = scaleLinear()
        .domain([0, 1])
        .range(["#ec1b25", "#f9c501"]);

    const gradientSteps = colorScale.ticks(10)
        .map(value => colorScale(value));

    return (
        <div style={{width: '100%', fontFamily: 'monospace'}}>
            <svg
                width={"100%"}
                height={'180px'}
                viewBox={[
                    -1, -1,
                    2, 1
                ].join(" ")}
            >
                <defs>
                    <linearGradient
                        id={"Gauge_gradient"}
                        gradientUnits={"userSpaceOnUse"}
                        x1={'-1'}
                        x2={"1"}
                        y2={"0"}
                    >
                        {
                            gradientSteps.map((color, index) => (
                                <stop
                                    key={color}
                                    stopColor={color}
                                    offset={`${
                                        index / (gradientSteps.length - 1)
                                    }`}
                                />
                            ))
                        }
                    </linearGradient>
                </defs>
                <path
                    d={backgroundArc}
                    fill={"#470761"}
                />
                <path
                    d={filledArc}
                    fill={"url(#Gauge_gradient)"}
                />

                <path
                    d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
                    transform={`rotate(${
                        angle * (180 / Math.PI)
                    }) translate(-0.2, -0.33)`}
                    fill="#96cefd"
                />
            </svg>

            <Grid container>
                <Grid container item xs={12} justify={"center"}>
                    <div style={{
                        color: "#8fdbfc",
                        marginTop: "0.4em",
                        fontSize: "2.5em",
                        lineHeight: "1em",
                        fontWeight: "900",
                        fontFeatureSettings: "'zero', 'tnum' 1",
                    }}>
                        { format(",")(value) }
                    </div>
                </Grid>
                <Grid container item xs={12} justify={"center"}>
                    {!!label && (
                        <div style={{
                            color: "#46adef",
                            marginTop: "0.6em",
                            fontSize: "1.5em",
                            lineHeight: "1.3em",
                            fontWeight: "700",
                        }}>
                            { label }
                        </div>
                    )}
                </Grid>
                <Grid container item xs={12} justify={"center"}>
                    {!!units && (
                        <div style={{
                            color: "#2981e6",
                            lineHeight: "1.3em",
                            fontWeight: "300",
                        }}>
                            { units }
                        </div>
                    )}
                </Grid>
                <Grid container item xs={12} justify={"center"}>
                    {!!date && (
                        <div style={{
                            color: "#46adef",
                            marginTop: "0.6em",
                            fontSize: "1.3em",
                            lineHeight: "1.3em",
                            fontWeight: "700",
                        }}>
                            { <Countdown date={date} /> }
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default Gauge;