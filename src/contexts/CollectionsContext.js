import {createContext, useEffect, useState} from "react";
import {getCollections} from "../utils/volume-factory";
import {getNumberOfRandomImagesFromCollection} from "../utils/ipfs-utils";

const CollectionsContext = createContext({
    featuredCollection: null,
    featuredCollectionImages: null,
    otherCollections: null,
    otherCollectionsImages: null,
    collectionsInit: null,
    refreshCollections: null,
});

export const CollectionsProvider = ({children}) => {
    const [featuredCollection, setFeaturedCollection] = useState({});
    const [featuredCollectionImages, setFeaturedCollectionImages] = useState([]);
    const [otherCollections, setOtherCollections] = useState([]);
    const [otherCollectionsImages, setOtherCollectionsImages] = useState([]);
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
                    console.log(images);
                    if(i === 0)
                        setFeaturedCollectionImages(images);
                    else
                        otherImages.push(images);
                }
                setOtherCollections(res.slice(1,res.length-1));
                setOtherCollectionsImages(otherImages);
                setFeaturedCollection(res[0]);
            }
            setCollectionsInit(true);
        });
    }

    return (
        <CollectionsContext.Provider
            value={{
                featuredCollection,
                featuredCollectionImages,
                otherCollections,
                otherCollectionsImages,
                collectionsInit,
                refreshCollections
            }}
        >
            {children}
        </CollectionsContext.Provider>
    )
}

export const CollectionsConsumer = CollectionsContext.Consumer;

export default CollectionsContext;