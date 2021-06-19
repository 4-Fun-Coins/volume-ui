import {makeStyles} from "@material-ui/core";
import Canvas from "./Canvas";

const landingStyles = makeStyles((theme) => ({
    universeBackground: {
        overflow: "hidden"
    },
}));

const LandingPage = () => {
    const classes = landingStyles();

    let init = false;

    const elements = [];

    const draw = (ctx, frameCount) => {

        // Space Backdrop
        let spaceDust = new Image();
        spaceDust.width = window.innerWidth;
        spaceDust.height = window.innerHeight * 2.75;

        spaceDust.onload = () => {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(spaceDust, 0, 0, spaceDust.width, spaceDust.height);
        };
        spaceDust.src = '/spaceDust4x.png';

        // init
        if (!init) {
            // Generate random elements
            let planet1 = false;
            let planet2 = false;
            let planet3 = false;
            let planet4 = false;
            let planet5 = false;

            for (let i = 0; i < 20; i++) {
                const element = Math.floor(Math.random() * 6 + 1);

                switch (element) {
                    case 1: {
                        // rock
                        elements.push(drawElement(ctx, '/rock3.png', i, false));
                        break;
                    }

                    case 2: {
                        // planet1
                        if (!planet1) {
                            elements.push(drawElement(ctx, '/blue_planet.png', i, true));
                            planet1 = true;
                        } else
                            elements.push(drawElement(ctx, '/double_rock.png', i, false));
                        break;
                    }

                    case 3: {
                        // planet2
                        if (!planet2) {
                            elements.push(drawElement(ctx, '/deep_red_planet.png', i, true));
                            planet2 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.png', i, false));
                        break;
                    }

                    case 4: {
                        // planet3
                        if (!planet3) {
                            elements.push(drawElement(ctx, '/orange_planet.png', i, true));
                            planet3 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.png', i, false));
                        break;
                    }

                    case 5: {
                        // planet4
                        if (!planet4) {
                            elements.push(drawElement(ctx, '/pink_planet.png', i, true));
                            planet4 = true;
                        } else
                            elements.push(drawElement(ctx, '/double_rock.png', i, false));
                        break;
                    }

                    case 6: {
                        // planet5
                        if (!planet5) {
                            elements.push(drawElement(ctx, '/red_planet.png', i, true));
                            planet5 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.png', i, false));
                        break;
                    }
                }
            }

            init = true;
        } else {
            // Translate elements
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].x - elements[i].vx < -100)
                    elements[i].x = window.innerWidth + 10;
                else {
                    elements[i].draw();
                    elements[i].x -= elements[i].vx
                }
            }
        }
    }

    const drawElement = (ctx, elementSrc, index, planet) => {
        // Random speed
        const speed = Math.floor(Math.random() * 15 + 1);
        const delay = Math.random();
        const depth = Math.random() * 2;

        // Element
        let element = {
            x: window.innerWidth * 1.05 + delay,
            y: window.innerHeight * 0.05 * index * (planet ? 2 : 1),
            vx: Math.floor(planet ? speed * 0.5 : speed * 1.5),
            draw: function () {

                let el = new Image();

                el.onload = () => {
                    ctx.imageSmoothingEnabled = false;

                    ctx.drawImage(el,
                        Math.floor(this.x),
                        Math.floor(this.y),
                        Math.floor(el.width * (planet ? 0.6 : 0.4) * depth),
                        Math.floor(el.height * (planet ? 0.6 : 0.4) * depth)
                    );
                };
                el.src = elementSrc;
            }
        }
        element.draw();

        return element;
    }

    return (
        <Canvas
            className={classes.universeBackground}
            draw={draw}
        />
    )
}

export default LandingPage;