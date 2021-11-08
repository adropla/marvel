const thumbnail = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fnot-working-sign-stamp-not-working-sign-stamp-white-background-vector-illustration-129818103.jpg&f=1&nofb=1';
const RandomCharError = (reloadFunc) => {
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Character not found" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">Error</p>
                <p className="randomchar__descr">
                    Character not found
                </p>
                <div className="randomchar__btns">
                    <a href={'/'} className="button button__main">
                        <div className="inner" onClick={reloadFunc}>Reload</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

const CharListError = (reloadFunc) => {
    return (
        <div className="char__list">
            <img src={thumbnail} alt="Error" />
            <button className="button button__main button__long">
                <div className="inner" onClick={reloadFunc}>Reload</div>
            </button>
        </div>
    )
}

const CharInfoError = () => {
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={thumbnail} alt="Error"/>
                <div>
                    <div className="char__info-name">Error</div>
                    <div className="char__btns">
                    </div>
                </div>
            </div>
            <div className="char__descr">
            </div>
        </div>
    )
}


export {RandomCharError, CharListError, CharInfoError};