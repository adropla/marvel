import './charList.scss';
import { useList } from '../../hooks/list.hook';

const CharList = (props) => {
    const base_limit = 9;
    const base_offset = 210;
    const {
        itemsList, 
        itemRefs, 
        error, 
        loading, 
        errorMessage, 
        spinner, 
        isCharListEnd, 
        focusOnItem, 
        updateFunction,
    } = useList({base_limit, base_offset, type: 'chars'});

    const renderItems = (charList) => {
        const items = charList.map((char, i) => {
            return (
                <li 
                tabIndex={0}
                className="char__item" 
                key={char.id} 
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onChangeChar(char.id)
                    focusOnItem(i);
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        props.onChangeChar(char.id)
                        focusOnItem(i);
                    }
                }}
                >
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(itemsList);

    const content = !(error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {content}
            {spinner}
            <button 
            className="button button__main button__long" 
            onClick={updateFunction} 
            disabled={loading}
            style={{display: (isCharListEnd || error) ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;