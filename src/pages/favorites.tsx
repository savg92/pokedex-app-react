import { getPokemon } from '@/services/pokemonApi';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import CardPokemon from '../components/cardPokemon';
import { Pokemon } from '@/types';

const Favorites = () => {
	const [favorites, setFavorites] = useState<string[]>([]);

	const title = useMemo(
		() => `Pokedéx - Favorites`,
        []
	);

	useEffect(() => {
		document.title = title || 'Favorites';
	}, [title]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const favoritesFromStorage = JSON.parse(
				localStorage.getItem('favorites') || '[]'
			);
			setFavorites(favoritesFromStorage);
		}
	}, []);

	const { data, isLoading, isError, error } = useQuery(
		['pokemon', favorites],
		() => Promise.all(favorites.map((pokemon: string) => getPokemon(pokemon))),
		{ enabled: favorites.length > 0 }
	);

	return (
		<>
			<h1 className='text-4xl font-bold text-center mt-8 mb-4'>Favorites</h1>
			<div className='flex flex-wrap justify-center gap-4 py-8'>
				{isLoading ? (
					<CardPokemon
						id={0}
						name='Loading...'
						img=''
						types={[{ type: { name: 'normal' } }]}
					/>
				) : isError ? (
					<p>Error: {(error as Error).message}</p>
				) : (
					data?.map((pokemon: Pokemon) => (
						<Link
							to={`/pokemon/${pokemon.name}`}
							key={pokemon.id}
						>
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
