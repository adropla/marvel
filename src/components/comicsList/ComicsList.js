import './comicsList.scss';

import { useList } from '../../hooks/list.hook';

const ComicsList = () => {
    const base_limit = 8;
    const base_offset = 210;

    const {
        itemsList, 
        itemRefs, 
        focusOnItem, 
        error, 
        loading, 
        errorMessage, 
        spinner, 
        isItemsListEnd, 
        getAllComics, 
        setOffset,
        onItemsListLoaded,
        offset,
    } = useList({base_limit, base_offset, updateFunction: updateComicsList});

    function updateComicsList() {
        getAllComics(base_limit, offset)
        .then(onItemsListLoaded)

        setOffset(offset => offset + base_limit);
    }

    function renderItems(comicsList) {    
        const items = comicsList.map((comics, i) => {
            return (
                <li className="comics__item"
                tabIndex={0}
                key={comics.id}
                ref={el => itemRefs.current[i] = el}
                onClick={() => focusOnItem(i)}
                onKeyPress={(e) => {if (e.key === ' ' || e.key === 'Enter') focusOnItem(i)}}>
                    <a href={comics.homepage} tabIndex={-1}>
                        <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comics.price}$</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(itemsList);

    const content = !(error) ? items : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {content}
            {spinner}
            <button className="button button__main button__long"
            onClick={updateComicsList} 
            disabled={loading}
            style={{display: (isItemsListEnd || error) ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;