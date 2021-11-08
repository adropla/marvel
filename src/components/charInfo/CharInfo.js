import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import { CharInfoError } from '../errorMessages/ErrorMessages';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';

const CharInfo = (props) => {
    const marvelService = new MarvelService();

    const {id} = props;

    const [char, setChar] = useState(null);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const spinner = loading ? <Spinner /> : null;
    const errorMess = error ? <CharInfoError /> : null;
    const skeleton = char || loading || error ? null : <Skeleton />
    const content = !(loading || error || !char || !comics) ? <View char={char} comics={comics}/> : null;

    const onIdNull = (id) => {
        if (!id) {
            setError(false);
        }
    }    

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

    useEffect(() => {
        setLoading(true);
        marvelService
        .getCharacter(id)
        .then(onCharLoaded)
        .catch(onError)
        .finally(onIdNull);
        marvelService
        .getComicsByCharacter(id)
        .then(onComicsLoaded)
        .catch(onError)
        .finally(onIdNull);
    }, [id]);


    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMess}
            {content}
        </div>
    )
}

const View = ({char, comics}) => {
    return (
        <>
            <div className="char__basics">
                <img src={char.thumbnail} alt={char.name}/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length ? comics.map((item, i) => (
                    <li className="char__comics-item" key={i}>
                        {item}
                    </li>
                )) : null}
            </ul>
        </>
    )
}

export default CharInfo;