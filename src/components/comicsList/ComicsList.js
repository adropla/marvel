import './comicsList.scss';

import { useList } from '../../hooks/list.hook';

const ComicsList = () => {
    const base_limit = 8;
    const base_offset = 210;

    const {
        itemsList,
        itemRefs,
        error,
        errorMessage,
        loading,
        spinner,
        isItemsListEnd,
        updateFunction,
    } = useList({base_limit, base_offset, type: 'comics'});


    function renderItems(comicsList) {    
        const items = comicsList.map((comics, i) => {
            return (
                <li className="comics__item"
                tabIndex={0}
                key={comics.id}
                ref={el => itemRefs.current[i] = el}>
                    <a href={comics.homepage}
                    tabIndex={-1}
                    target="_blank"
                    rel="noreferrer">
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
            onClick={updateFunction} 
            disabled={loading}
            style={{display: (isItemsListEnd || error) ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;