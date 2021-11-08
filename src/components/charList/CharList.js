import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import {CharListError} from '../errorMessages/ErrorMessages';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            charList: [],
            loading: true,
            error: false,
        }
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList: [...this.state.charList, ...charList],
            loading: false,
            error: false
        })
    }

    renderCharList = (charList) => {
        const {onChangeChar} = this.props;
        return (
            charList.map((char) => 
            <li className="char__item" key={char.id} onClick={() => onChangeChar(char.id)}>
                <img src={char.thumbnail} alt={char.name}/>
                <div className="char__name">{char.name}</div>
            </li>)
        )
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharList = async () => {
        await this.setState({loading: true})

        this.marvelService
        .getAllCharacters(9, this.state.offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)

        await this.setState({offset: this.state.offset + 9})
    }

    render() {
        const {loading, error, charList} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <CharListError reloadFunc={this.updateCharList} /> : null;

        return (
            <div className="char__list">
                {errorMessage}
                <ul className="char__grid">
                    {charList.length ? this.renderCharList(charList) : null}
                </ul>
                {spinner}
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.updateCharList}>load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;