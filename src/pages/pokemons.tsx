import { getPokemons } from '@/services/pokemonApi';
import { useQuery } from 'react-query';
import { usePagination } from '@mantine/hooks';

import CardPokemon from '../components/cardPokemon';
import { Link } from 'react-router-dom';
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
	const { data, isLoading, isError } = useQuery('pokemons', getPokemons);

	const itemsPerPage = 10;
	const total = Math.ceil(data?.length / itemsPerPage);

	const [visibleItems, setVisibleItems] = useState(
		data?.slice(0, itemsPerPage) || []
	);

	useEffect(() => {
		setVisibleItems(data?.slice(0, itemsPerPage) || []);
	}, [data]);

	const pagination = usePagination({
		total,
		initialPage: 1,
		onChange: (page) => {
			const start = (page - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			setVisibleItems(data?.slice(start, end) || []);
		},
		
	});
	const { currentPage, setPage } = pagination;

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
						href='#'
						>
							&lt;&lt;
						</PaginationFirst>
					</PaginationItem>
					<PaginationItem>
						<PaginationPrevious
							href='#'
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
									href={`#${page}`}
									onClick={() => setPage(page)}
									isActive={page === currentPage}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						)
					)}
					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={pagination.next}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLast
							onClick={pagination.last}
							href='#'
						>
							&gt;&gt;
						</PaginationLast>
					</PaginationItem>
				</PaginationContent>
			</Pagination>


		</>
	);
};

export default Pokemons;
