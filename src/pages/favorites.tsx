import { getPokemon } from '@/services/pokemonApi';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CardPokemon from '../components/cardPokemon';
import { Pokemon } from '@/types';

const Favorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        document.title = 'Pokedéx - Favorites';
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favoritesFromStorage = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            setFavorites(favoritesFromStorage);
        }
    }, []);

    const { data, isLoading, isError, error, refetch } = useQuery(
        ['pokemon', favorites],
        () => Promise.all(favorites.map((pokemon: string) => getPokemon(pokemon))),
        { enabled: favorites.length > 0 }
    );

    return (
        <>
            <h1 className='text-4xl font-bold text-center mt-8 mb-4'>Favorites</h1>
            <div className='flex flex-wrap justify-center gap-4 py-8'>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <>
                        <p>Error: {(error as Error).message}</p>
                        <button onClick={() => refetch()}>Retry</button>
                    </>
                ) : (
                    data?.map((pokemon: Pokemon) => (
                        <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                            <CardPokemon
                                id={pokemon.id}
                                name={pokemon.name}
                                img={pokemon.sprites.front_default}
                                types={pokemon.types}
                            />
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};

export default Favorites;