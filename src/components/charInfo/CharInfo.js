import './charInfo.scss';

import { PropTypes } from 'prop-types';

import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import { CharInfoError } from '../errorMessages/ErrorMessages';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react'; 

const CharInfo = (props) => {
    const marvelService = new MarvelService();

    const {id} = props;

    const [char, setChar]         = useState(null);
    const [comics, setComics]     = useState([]);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState(false);
    const [isAttached, setAttach] = useState(false);

    const spinner = loading ? <Spinner /> : null;
    const errorMess = error ? <CharInfoError /> : null;
    const skeleton = char || loading || error ? null : <Skeleton />
    const content = !(loading || error || !char || !comics) ? <View char={char} comics={comics}/> : null;   

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        setError(false);
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
        setLoading(false);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const switchAttachedClasses = () => {
        if (window.scrollY > 440) {
            setAttach(true);          
        } else {
            setAttach(false);
        }
    }

    useEffect(() => {
        if (id) {
            setLoading(true);
            marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
            
            marvelService
            .getComicsByCharacter(id, 10)
            .then(onComicsLoaded)
            .catch(onError);
        }
    }, [id]);


    useEffect(() => {
        window.addEventListener('scroll', switchAttachedClasses);

        return () => {
            window.removeEventListener('scroll', switchAttachedClasses);
        }
    }, []);

    return (
        <div className="char__info" style={isAttached ? {position: 'fixed', top: '6px', left: '969px', width: '425px'} : {}}>
            {skeleton}
            {spinner}
            {errorMess}
            {content}
        </div>
    )
}

const View = ({char, comics}) => {
    const { thumbnail, name, homepage, wiki, description } = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length ? comics.map((item, i) => (
                    <li className="char__comics-item" key={i}>
                        {item} 
                    </li>
                )) : "There is no comics with this character"}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;