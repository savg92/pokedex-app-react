import { PokemonAPI } from "@/types";
import axios from "axios";

const getPokemons = async () => {
    const { data } = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
        // 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
        // 'https://pokeapi.co/api/v2/pokemon'
    );

    const pokemonData = await Promise.all(
			data.results.map(async (pokemon: PokemonAPI) => {
				const response = await axios.get(pokemon.url);
				return response.data;
			})
		);

    return pokemonData;
}

const getPokemon = async (id: number | string) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
}

export { getPokemons, getPokemon };