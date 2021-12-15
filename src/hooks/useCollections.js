import {useContext} from 'react';
import CollectionsContext from "../contexts/CollectionsContext";

const useCollections = () => useContext(CollectionsContext);

export default useCollections;