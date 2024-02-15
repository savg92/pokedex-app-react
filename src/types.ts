interface PokemonAPI {
	name: string;
	url: string;
}

interface CardPokemonProps {
    id: number;
    name: string;
    img: string;
    types: { type: { name: string } }[];
}


type PokemonType = CardPokemonProps["types"][0];

type Ability = {
    ability: {
        name: string;
    }
}

type Stat = {
    base_stat: number;
    stat: {
        name: string;
    }
}

type Type = {
    type: {
        name: string;
    }
}

type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
    weight: number;
    height: number;
    sprites: {
        front_default: string;
    }
}

export type { PokemonAPI , CardPokemonProps, PokemonType , Ability , Stat , Type , Pokemon }