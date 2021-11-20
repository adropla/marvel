import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { RandomCharError, CharListError, CharInfoError } from '../errorMessages/ErrorMessages'

import decoration from '../../resources/img/vision.png';

const Home = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onChangeChar = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary errorComponent={<RandomCharError/>}>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary errorComponent={<CharListError/>}>
                    <CharList onChangeChar={onChangeChar}/>
                </ErrorBoundary>
                <ErrorBoundary errorComponent={<CharInfoError/>}>
                    <CharInfo id={selectedChar}/>
                </ErrorBoundary>                        
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>  
        </>   
    )      
}

export default Home;