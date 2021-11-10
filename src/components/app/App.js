import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { RandomCharError, CharListError, CharInfoError } from '../errorMessages/ErrorMessages'

import decoration from '../../resources/img/vision.png';

class App extends Component {
    constructor() {
        super()
        this.state = {
            charInfoId: null
        }
    }

    onChangeChar = (id) => {
        this.setState({charInfoId: id})
    }

    
    
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary errorComponent={<RandomCharError/>}>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary errorComponent={<CharListError/>}>
                            <CharList onChangeChar={this.onChangeChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary errorComponent={<CharInfoError/>}>
                            <CharInfo id={this.state.charInfoId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;