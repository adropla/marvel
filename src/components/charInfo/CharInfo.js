import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';

const CharInfo = (props) => {
    const marvelService = new MarvelService();

    const {id} = props;

    const [char, setChar] = useState({});
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onComicsLoaded = (comics) => {
        setComics(comics);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        marvelService
        .getCharacter(id)
        .then(onCharLoaded);
        marvelService
        .getComicsByCharacter(id)
        .then(onComicsLoaded);
    }, [id]);


    return (
        <div className="char__info">
            {!loading ? 
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
            </> : <Spinner/>    
            }
        </div>
    )
}

export default CharInfo;