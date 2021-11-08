class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=877c0b66e32af672ea3acac7f1740ed6'

    getResourses = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw Error(`Could not fetch ${url} with status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (limit, offset) => {
        const res = await this.getResourses(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourses(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    getComicsByCharacter = async (id) => {
        const res = await this.getResourses(`${this._apiBase}characters/${id}/comics?${this._apiKey}`);
        return this._transformComicsByCharacter(res.data.results);
    }

    _transformComicsByCharacter = (comics) => {
        return comics.map(item => item.title)
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(220)}...` : 'There is no desctiption for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;