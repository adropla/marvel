import { useState } from "react";

import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";

import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import { RandomCharError, CharListError, CharInfoError } from '../../components/errorMessages/ErrorMessages'

import decoration from '../../resources/img/vision.png';

export const Home = () => {
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