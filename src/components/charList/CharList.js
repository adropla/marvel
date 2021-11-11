import { Component, createRef } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import {CharListError} from '../errorMessages/ErrorMessages';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 210,
            charList: [],
            loading: true,
            error: false,
            isCharListEnd: false,
            limit: 9,
        }
    }
    
    marvelService = new MarvelService();

    onScrollUpdateCharList = () => {
        const maxHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
        if (window.pageYOffset > maxHeight) {
            setTimeout(this.updateCharList, 300);
        }
    }

    componentDidMount() {
        this.updateCharList();
        // window.addEventListener('scroll', this.onScrollUpdateCharList);
    }
    
    componentWillUnmount() {
        // window.removeEventListener('scroll', this.onScrollUpdateCharList);
    }

    onCharListLoaded = (charList) => {
        let isEnded = false;
        if (Object.keys(charList).length < this.state.limit) {
            isEnded = true;
        }
        this.setState({
            charList: [...this.state.charList, ...charList],
            loading: false,
            error: false,
            isCharListEnd: isEnded,
        })
    }

    renderCharList = (charList) => {
        
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
        .getAllCharacters(this.state.limit, this.state.offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)

        await this.setState({offset: this.state.offset + 9})
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems = (charList) => {
        const {onChangeChar} = this.props;
        const items = charList.map((char, i) => {
            return (
                <li 
                tabIndex={0}
                className="char__item" 
                key={char.id} 
                ref={this.setRef}
                onClick={() => {
                    onChangeChar(char.id)
                    this.focusOnItem(i);
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        onChangeChar(char.id)
                        this.focusOnItem(i);
                    }
                }}
                >
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        })

        console.log(items);

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    
    render() {        
        const {loading, error, charList, isCharListEnd} = this.state;
        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <CharListError reloadFunc={this.updateCharList} /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {content}
                {spinner}
                <button 
                className="button button__main button__long" 
                onClick={this.updateCharList} 
                disabled={loading}
                style={{display: isCharListEnd ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;