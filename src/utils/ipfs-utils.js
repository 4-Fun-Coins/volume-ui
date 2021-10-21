import {create} from 'ipfs-http-client';
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