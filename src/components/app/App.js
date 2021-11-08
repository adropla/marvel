import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    constructor() {
        super()
        this.state = {
            charInfoId: 1009165
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
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onChangeChar={this. onChangeChar}/>
                        <CharInfo id={this.state.charInfoId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;