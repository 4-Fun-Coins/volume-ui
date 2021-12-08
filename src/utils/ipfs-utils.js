import {create} from 'ipfs-http-client';
import toBuffer from "it-to-buffer";
const {ipfsGateway} = require('./config');

export async function getDir(cid, abortSignal) {
    // console.log('Creating gateway...')
    const ipfs = await create(ipfsGateway);

    // console.log('Created gateway...');

    let files = [];

    for await (const file of ipfs.ls(cid, {
        signal: abortSignal
    })) {
        // console.log('Pushed file ', files.length);
        files.push(file);
    }

    // console.log('Returning files');

    return sortDirectory(files, 'name');
}

export const getFileContents = async (path) => {
    const ipfs = await create(ipfsGateway);

    let res = '';

    for await (const chunk of ipfs.cat(`/ipfs/${path}`)) {
        res += new TextDecoder().decode(chunk);
    }

    return res;
}

export const sortDirectory = (directory, key) => {
    return directory.sort(GetSortOrderWithSlice(key, 0, 5));
}

export const getImageURL = async (cid) => {
    const ipfs = await create(ipfsGateway);
    const buffer = await toBuffer(ipfs.cat(cid));
    return new Blob([buffer]);
}

export const getNumberOfRandomImagesFromCollection = async (collection, numImages) => {
    return new Promise((res, rej) => {
        let numbers = [];
        for(let i = 0; i < numImages; i++) {
            // generate random number
            let num;
            do {
                num = Math.floor((Math.random()*collection.totalSupply) + 1);
            } while(numbers.includes(num));

            numbers.push(num);
        }

        Promise.all(numbers.map(async (num) => {
            // get url's
            const json = JSON.parse(await getFileContents(`${collection.URI.slice(7,collection.URI.length-1)}/${num}.json`));
            let blob = await getImageURL(json.properties.image.description.slice(7, json.properties.image.description.length));
            let url = URL.createObjectURL(blob);
            return {
                cid: json.properties.image.description.slice(7, json.properties.image.description.length),
                url: url
            };
        })).then((result) => {
            res(result);
        });
    });
}

// === helper
function GetSortOrderWithSlice(key, begin, fromEnd) {
    return function(a, b) {
        let aVal = parseInt(a[key].slice(begin, a[key].length - fromEnd));
        let bVal = parseInt(b[key].slice(begin, b[key].length - fromEnd));

        if (aVal > bVal) {
            return 1;
        } else if (aVal < bVal) {
            return -1;
        }
        return 0;
    }
}