import { getPokemons } from '@/services/pokemonApi';

import { useQuery } from 'react-query';
import { usePagination } from '@mantine/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Pokemon } from '@/types';

import CardPokemon from '../components/cardPokemon';
import PaginationComponent from '@/components/pagination';

const Pokemons = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery('pokemons', () =>
		getPokemons(151, 0)
	);

	const itemsPerPage = 20;
	const total = data ? Math.ceil(data.length / itemsPerPage) : 0;

	const searchParams = new URLSearchParams(location.search);
	const pageParam = searchParams.get('page');
	const initialPage = parseInt(pageParam ? pageParam : '1') || 1;

	const start = (initialPage - 1) * itemsPerPage;
	const end = start + itemsPerPage;

	const [visibleItems, setVisibleItems] = useState(
		data?.slice(start, end) || []
	);

	useEffect(() => {
		setVisibleItems(data?.slice(start, end) || []);
	}, [data, start, end]);

	const pagination = usePagination({
		total,
		initialPage,
		onChange: (page) => {
			const start = (page - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			setVisibleItems(data?.slice(start, end) || []);

			searchParams.set('page', page.toString());
			navigate({
				pathname: location.pathname,
				search: searchParams.toString(),
			});
		},
	});

	return (
		<>
			<div className='w-5/6 m-auto p-4 flex flex-wrap justify-center gap-4'>
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
					visibleItems?.map((pokemon: Pokemon) => (
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
