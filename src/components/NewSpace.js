import {makeStyles} from "@material-ui/core";
import { useEffect } from "react";
import Canvas from "./Canvas";

function loadImages(pathsArray, callback) {
    const images = {};
    let loadedImageCount = 0;

    // Make sure arr is actually an array and any other error checking
    for (let i = 0; i < pathsArray.length; i++){
        const image = new Image();
        image.onload = imageLoaded;
        image.src = pathsArray[i];
        images[pathsArray[i]] = image;
    }

    function imageLoaded(e) {
        loadedImageCount++;
        if (loadedImageCount >= pathsArray.length) {
            callback(images);
        }
    }
}


const landingStyles = makeStyles((theme) => ({
    universeBackground: {
        overflow: "hidden"
    },
}));

const NewSpace = () => {
    const classes = landingStyles();

    let init = false;
    let loaded = false;
    const elements = [];
    let loadedImages;
    
    useEffect(() => {
        if(!loaded)
            loadImages([
                '/spaceDust4x.webp',
                '/rock3.webp',
                '/blue_planet.webp',
                '/double_rock.webp',
                '/deep_red_planet.webp',
                '/rock1.webp',
                '/pink_planet.webp',
                '/red_planet.webp',
                '/orange_planet.webp'
            ], (images) => {
                console.log('images loaded !' + JSON.stringify(images));
                loadedImages = images;
                loaded = true;
            });
    },[]);

    let lastFrame = performance.now();
    const wantedFps = 60

    const getLastFrameTime = () => {
        const elappsedTime = performance.now() - lastFrame;
        if(elappsedTime > 1000/wantedFps)
            lastFrame = performance.now();
        return elappsedTime;
    }

    const draw = (ctx, frameCount) => {
        if(getLastFrameTime() < 1000/wantedFps || !loadedImages) // 60fsp
            return;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        // Space Backdrop
        let spaceDust = loadedImages['/spaceDust4x.webp'];

        spaceDust.width = window.innerWidth;
        spaceDust.height = Math.floor(window.innerHeight * 2.75);

        ctx.drawImage(spaceDust, 0, 0, spaceDust.width, spaceDust.height);

        // init
        if (!init) {
            // Generate random elements
            let planet1 = false;
            let planet2 = false;
            let planet3 = false;
            let planet4 = false;
            let planet5 = false;

            for (let i = 0; i <20; i++) {
                const element = Math.floor(Math.random() * 6 + 1);

                switch (element) {
                    case 1: {
                        // rock
                        elements.push(drawElement(ctx, '/rock3.webp', i, false));
                        break;
                    }

                    case 2: {
                        // planet1
                        if (!planet1) {
                            elements.push(drawElement(ctx, '/blue_planet.webp', i, true));
                            planet1 = true;
                        } else
                            elements.push(drawElement(ctx, '/double_rock.webp', i, false));
                        break;
                    }

                    case 3: {
                        // planet2
                        if (!planet2) {
                            elements.push(drawElement(ctx, '/deep_red_planet.webp', i, true));
                            planet2 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.webp', i, false));
                        break;
                    }

                    case 4: {
                        // planet3
                        if (!planet3) {
                            elements.push(drawElement(ctx, '/orange_planet.webp', i, true));
                            planet3 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.webp', i, false));
                        break;
                    }

                    case 5: {
                        // planet4
                        if (!planet4) {
                            elements.push(drawElement(ctx, '/pink_planet.webp', i, true));
                            planet4 = true;
                        } else
                            elements.push(drawElement(ctx, '/double_rock.webp', i, false));
                        break;
                    }

                    case 6: {
                        // planet5
                        if (!planet5) {
                            elements.push(drawElement(ctx, '/red_planet.webp', i, true));
                            planet5 = true;
                        } else
                            elements.push(drawElement(ctx, '/rock1.webp', i, false));
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
        //ctx.restore();
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
                let el = loadedImages[elementSrc];
                ctx.drawImage(el,
                        Math.floor(this.x),
                        Math.floor(this.y),
                        Math.floor(el.width * (planet ? 0.6 : 0.4) * depth),
                        Math.floor(el.height * (planet ? 0.6 : 0.4) * depth)
                )
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

export default NewSpace;