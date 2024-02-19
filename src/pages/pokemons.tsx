import { getPokemons } from '@/services/pokemonApi';
import { useQuery } from 'react-query';
import { usePagination } from '@mantine/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { Pokemon } from '@/types';

import CardPokemon from '../components/cardPokemon';
import PaginationComponent from '@/components/pagination';
import SearchPokemon from '@/components/searchPokemon';

const Pokemons = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useQuery('pokemons', () =>
		getPokemons(151, 0)
	);

	useEffect(() => {
		document.title = 'Pokedéx';
	}, [data]);

	const itemsPerPage = 10;

	const total = useMemo(() => {
		return data ? Math.ceil(data.length / itemsPerPage) : 0;
	}, [data]);

	const searchParams = new URLSearchParams(location.search);
	const pageParam = searchParams.get('page');
	const initialPage = parseInt(pageParam ? pageParam : '1') || 1;

	const start = (initialPage - 1) * itemsPerPage;
	const end = start + itemsPerPage;

	const visibleItems = useMemo(() => {
		return data?.slice(start, end) || [];
	}, [data, start, end]);

	const pagination = usePagination({
		total,
		initialPage,
		onChange: (page) => {
			searchParams.set('page', page.toString());
			navigate({
				pathname: location.pathname,
				search: searchParams.toString(),
			});
		},
	});

	return (
		<>
			<SearchPokemon />
			<div className='w-5/6 m-auto p-4 flex flex-wrap justify-center gap-4'>
				{isLoading ? (
					<p>Loading...</p>
				) : isError ? (
					<p>Error: {(error as Error).message}</p>
				) : (
					visibleItems?.map((pokemon: Pokemon) => (
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
			<PaginationComponent
				first={pagination.first}
				previous={pagination.previous}
				next={pagination.next}
				last={pagination.last}
				range={pagination.range}
				active={pagination.active}
				setPage={pagination.setPage}
			/>
		</>
	);
};

export default Pokemons;