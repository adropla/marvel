class ErrorMessages {

    RandomCharError = () => {
        const thumbnail = 'https://image.flaticon.com/icons/png/512/705/705793.png';
        
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
                            <div className="inner">Reload</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorMessages;