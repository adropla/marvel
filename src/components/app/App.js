import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner"
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { RandomCharError, CharListError, CharInfoError } from '../errorMessages/ErrorMessages'

import decoration from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null);

    const onChangeChar = (id) => {
        setSelectedChar(id)
    }
    
    // return (
    //     <div className="app">
    //         <AppHeader/>
    //         <main>
    //             <ErrorBoundary errorComponent={<RandomCharError/>}>
    //                 <RandomChar/>
    //             </ErrorBoundary>
    //             <div className="char__content">
    //                 <ErrorBoundary errorComponent={<CharListError/>}>
    //                     <CharList onChangeChar={onChangeChar}/>
    //                 </ErrorBoundary>
    //                 <ErrorBoundary errorComponent={<CharInfoError/>}>
    //                     <CharInfo id={selectedChar}/>
    //                 </ErrorBoundary>                        
    //             </div>
    //             <img className="bg-decoration" src={decoration} alt="vision"/>
    //         </main>
    //     </div>
    // )
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <AppBanner/>
                <ComicsList/>
            </main>
        </div>
    )
}

export default App;