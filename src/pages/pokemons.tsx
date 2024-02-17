import { getPokemons } from '@/services/pokemonApi';
import { useQuery } from 'react-query';
import { usePagination } from '@mantine/hooks';

import CardPokemon from '../components/cardPokemon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pokemon } from '@/types';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { useEffect, useState } from 'react';

const Pokemons = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery('pokemons', getPokemons);

	const itemsPerPage = 10;
	const total =  (data) ? Math.ceil(data.length / itemsPerPage) : 0;

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

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationFirst
							onClick={pagination.first}
							href={`#search=${pagination.active}`}
						>
							&lt;&lt;
						</PaginationFirst>
					</PaginationItem>
					<PaginationItem>
						<PaginationPrevious
							href={`#search=${pagination.active}`}
							onClick={pagination.previous}
						/>
					</PaginationItem>
					{pagination.range.map((page: number | 'dots', index: number) =>
						page === 'dots' ? (
							<PaginationItem key={index}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={index}>
								<PaginationLink
									href={`#search=${page}`}
									onClick={() => pagination.setPage(page)}
									isActive={pagination.active === page}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						)
					)}
					<PaginationItem>
						<PaginationNext
							href={`#search=${pagination.active}`}
							onClick={pagination.next}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLast
							href={`#search=${pagination.active}`}
							onClick={pagination.last}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
};

export default Pokemons;
