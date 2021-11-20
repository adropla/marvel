import { useState, useEffect, useRef } from 'react';

import useMarvelService from '../services/MarvelService';
import {CharListError} from '../components/errorMessages/ErrorMessages';
import Spinner from '../components/spinner/Spinner';

export const useList = (props) => {
    const [limit]             = useState(props.base_limit);
    const [offset, setOffset] = useState(props.base_offset);
    const updateFunction      = props.updateFunction;

    const [itemsList , setItemsList]           = useState([]);
    const [isItemsListEnd, setIsItemsListEnd]  = useState(false);

    const {loading, error, getAllCharacters, getAllComics} = useMarvelService();

    const onScrollUpdateItemsList = () => {
        const maxHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
        if (window.pageYOffset > maxHeight) {
            setTimeout(updateFunction, 200);
        }
    }

    useEffect(() => {
        updateFunction();
        // window.addEventListener('scroll', onScrollUpdateItemsList);
        return {
            // window.removeEventListener('scroll', onScrollUpdateItemsList);
        }
    }, [])

    const onItemsListLoaded = (itemsListNew) => {
        let isEnded = Object.keys(itemsListNew).length < limit;
        setIsItemsListEnd(isEnded);
        setItemsList(itemsList => [...itemsList, ...itemsListNew]);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <CharListError reloadFunc={updateFunction} /> : null;

    return {
        itemsList, 
        spinner, 
        errorMessage, 
        error, 
        loading, 
        itemRefs, 
        isItemsListEnd, 
        focusOnItem, 
        getAllCharacters, 
        getAllComics,
        onItemsListLoaded, 
        offset,
        setOffset
    }
}

