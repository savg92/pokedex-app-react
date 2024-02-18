import { getPokemons } from '@/services/pokemonApi';

import { useQuery } from 'react-query';
import { usePagination } from '@mantine/hooks';
import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
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

	useEffect(() => {
		document.title = 'Pokedéx';
	}, [data]);

	const itemsPerPage = 10;
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

	const [searchTerm, setSearchTerm] = useState('');
	const handleSubmit = (
		e: React.FormEvent,
		navigate: (path: string) => void,
		searchTerm: string
	) => {
		e.preventDefault();
		navigate(`/pokemon/${searchTerm}`);
	};

	return (
		<>
			<section>
				<Form
					onSubmit={(e) => handleSubmit(e, navigate, searchTerm)}
					className='flex justify-center gap-4 p-4'
				>
					<input
						type='text'
						placeholder='Search by name or id'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white'
					/>
					<button
						type='submit'
						className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
							searchTerm.length === 0
								? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300'
								: ''
						}`}
					>
						Search
					</button>
				</Form>
			</section>
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
			<div
			// className='flex justify-center items-center mt-8 gap-4 box-border px-12'
			>
				<PaginationComponent
					first={pagination.first}
					previous={pagination.previous}
					next={pagination.next}
					last={pagination.last}
					range={pagination.range}
					active={pagination.active}
					setPage={pagination.setPage}
				/>
			</div>
		</>
	);
};

export default Pokemons;
