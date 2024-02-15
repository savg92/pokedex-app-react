import { getPokemons } from '@/services/pokemonApi';
import { useQuery } from 'react-query';

import CardPokemon from '../components/cardPokemon';
import { Link } from 'react-router-dom';
import { Pokemon } from '@/types';
import { Pagination } from '@/components/ui/pagination';



const Pokemons  = () => {
	const { data, isLoading, isError } = useQuery('pokemons', getPokemons);


	return (
		<>
			<div className='w-5/6 m-auto p-4 flex flex-wrap justify-between gap-4'>
				{isLoading ? (
					<CardPokemon
						id={0}
						name='Loading...'
						img='https://via.placeholder.com/96'
						types={[]}
					/>
				) : isError ? (
					<div>Error</div>
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
					<Pagination />
			</div>
		</>
	);
};

export default Pokemons;
