import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=877c0b66e32af672ea3acac7f1740ed6';
    const _baseOffset = 210;

    const getAllCharacters = async (limit, offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComicsByCharacter = async (id, limit) => {
        const res = await request(`${_apiBase}characters/${id}/comics?limit=${limit}&${_apiKey}`);
        return _transformComicsByCharacter(res.data.results);
    }

    const _transformComicsByCharacter = (comics) => {
        return comics.map(item => item.title)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(220)}...` : 'There is no desctiption for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getComicsByCharacter, clearError} 
}

export default useMarvelService;