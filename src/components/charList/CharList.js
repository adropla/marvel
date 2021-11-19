import { useState, useEffect, useRef } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import {CharListError} from '../errorMessages/ErrorMessages';

const CharList = (props) => {
    const [charList , setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isCharListEnd, setIsCharListEnd] = useState(false);
    const [limit] = useState(9);
    
    const marvelService = new MarvelService();

    const onScrollUpdateCharList = () => {
        const maxHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
        if (window.pageYOffset > maxHeight) {
            setTimeout(updateCharList, 300);
        }
    }

    useEffect(() => {
        updateCharList();
        // window.addEventListener('scroll', this.onScrollUpdateCharList);
        return {
             // window.removeEventListener('scroll', this.onScrollUpdateCharList);
        }
    }, [])

    const onCharListLoaded = (charListNew) => {
        let isEnded = Object.keys(charListNew).length < limit;
        setLoading(false);
        setError(false);
        setIsCharListEnd(isEnded);
        setCharList(charList => [...charList, ...charListNew]);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateCharList = () => {
        setLoading(true);

        marvelService
        .getAllCharacters(limit, offset)
        .then(onCharListLoaded)
        .catch(onError)

        setOffset(offset => offset + 9);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(charList) {
        const items = charList.map((char, i) => {
            return (
                <li 
                tabIndex={0}
                className="char__item" 
                key={char.id} 
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onChangeChar(char.id)
                    focusOnItem(i);
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onChangeChar(char.id)
                        focusOnItem(i);
                    }
                }}
                >
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <CharListError reloadFunc={updateCharList} /> : null;
    const content = !(error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {content}
            {spinner}
            <button 
            className="button button__main button__long" 
            onClick={updateCharList} 
            disabled={loading}
            style={{display: isCharListEnd ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;