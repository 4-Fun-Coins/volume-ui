import {createContext, useEffect, useState} from "react";
import {getCollections} from "../utils/volume-factory";
import {getNumberOfRandomImagesFromCollection} from "../utils/ipfs-utils";

const CollectionsContext = createContext({
    collections: null,
    collectionsImages: null,
    collectionsInit: null,
    refreshCollections: null,
    getImagesForCollection: null,
    getCollectionForAddress: null
});

export const CollectionsProvider = ({children}) => {
    const [collections, setCollections] = useState([]);
    const [collectionsImages, setCollectionsImages] = useState([]);
    const [collectionsInit, setCollectionsInit] = useState(false);

    useEffect(() => {
        if (!collectionsInit){
            refreshCollections();
        }
    }, [collectionsInit]);

    const refreshCollections = () => { // TODO improve this by only refetching the new collection's images
        getCollections().then(async (res) => {
            if(res && res.length > 0) {
                let otherImages = [];
                for (let i = 0; i < res.length; i++) {
                    let images = await getNumberOfRandomImagesFromCollection(res[i], 4); // {cid: "", url: ""}
                    otherImages.push(images);
                }
                setCollections(res);
                setCollectionsImages(otherImages);
            }
            setCollectionsInit(true);
        });
    }

    const getImagesForCollection = (collection) => {
        for (let i = 0; i < collections.length; i++) {
            if (collection === collections[i]) {
                return collectionsImages[i];
            }
        }
    }

    const getCollectionForAddress = (address) => {
        for (let i = 0; i < collections.length; i++) {
            if (address === collections[i].nftAddress) {
                return collections[i];
            }
        }
    }

    return (
        <CollectionsContext.Provider
            value={{
                collections,
                collectionsImages,
                collectionsInit,
                refreshCollections,
                getImagesForCollection,
                getCollectionForAddress
            }}
        >
            {children}
        </CollectionsContext.Provider>
    )
}

export const CollectionsConsumer = CollectionsContext.Consumer;

export default CollectionsContext;