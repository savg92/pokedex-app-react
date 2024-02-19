import React, { useEffect, useState } from 'react';
import { Ability, Pokemon, Stat, Type } from '@/types';
import { CardDescription } from './ui/card';
import { Button } from './ui/button';

interface PokemonDetailProps {
	data: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ data }) => {
	const [favorites, setFavorites] = useState<string[]>([]);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const favoritesFromStorage = JSON.parse(
			localStorage.getItem('favorites') || '[]'
		);
		setFavorites(favoritesFromStorage);
		setIsFavorite(favoritesFromStorage.includes(data?.name));
	}, [data?.name]);

	const handleAddRemoveToFavorites = (
		favorites: string[],
		pokemon: string,
		setFavorites: (arg0: string[]) => void,
		setIsFavorite: (arg0: boolean) => void
	) => {
		const updatedFavorites = favorites.includes(pokemon)
			? favorites.filter((fav) => fav !== pokemon)
			: [...favorites, pokemon];
		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		setFavorites(updatedFavorites);
		setIsFavorite(updatedFavorites.includes(pokemon));
	};
	return (
		<CardDescription className='flex flex-col gap-6 md:border-l-2 justify-start md:pl-12'>
			<h2 className='text-xl underline font-bold'>Details</h2>
			<p>
				<span className='font-bold'>Height: </span>
				{data.height}
			</p>
			<p>
				<span className='font-bold'>Weight: </span>
				{data.weight}
			</p>
			<p>
				<span className='font-bold'>Base Experience: </span>
				{data.base_experience}
			</p>
			<div>
				<h2 className='text-xl underline font-bold'>Abilities</h2>
				<ul>
					{data.abilities.map((ability: Ability, index: number) => (
						<li key={index}>{ability.ability.name}</li>
					))}
				</ul>
			</div>
			<div>
				<h2 className='text-xl underline font-bold'>Stats</h2>
				<ul>
					{data.stats.map((stat: Stat, index: number) => (
						<li key={index}>
							{stat.stat.name}: {stat.base_stat}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h2 className='text-xl underline font-bold'>Types</h2>
				<ul>
					{data.types.map((type: Type, index: number) => (
						<li key={index}>{type.type.name}</li>
					))}
				</ul>
			</div>
			<Button
				onClick={() =>
					handleAddRemoveToFavorites(
						favorites,
						data.name,
						setFavorites,
						setIsFavorite
					)
				}
			>
				{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</Button>
		</CardDescription>
	);
};

export default PokemonDetail;
