import { getPokemon } from '@/services/pokemonApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Car } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import PokemonDetail from './pokemonDetail';

const QUERY_KEY = 'pokemon';
const ARTWORK_KEY = 'official-artwork';

const PokemonDetails = () => {
	const params = useParams();
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: [QUERY_KEY, params.name],
		queryFn: () => getPokemon(params.name as string),
	});

	const title = useMemo(
		() => `Pokemon - ${data?.name[0].toUpperCase() + data?.name.slice(1)}`,
		[data]
	);

	useEffect(() => {
		document.title = title || 'Pokemon';
	}, [title]);

	if (isLoading) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Loading...</CardTitle>
				</CardHeader>
				<CardContent>
					<Car size={96} />
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<div>
				<p>Error: {(error as Error).message}</p>
				<button onClick={() => refetch()}>Retry</button>
			</div>
		);
	}

	return (
		<>
			<h1 className='text-4xl text-center font-bold'>Pokemon Details</h1>
			<div className='mt-8 flex justify-center items-center'>
				<Card className='md:px-12'>
					<CardHeader>
						<CardTitle>{data.name}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col md:flex-row justify-between gap-12'>
						<div className='flex justify-center items-center w-max'>
							<img
								src={data.sprites.other[ARTWORK_KEY].front_default}
								alt={data.name}
								className=' w-72 h-72 hover:scale-110 transition-transform duration-300'
							/>
						</div>
						<PokemonDetail data={data} />
					</CardContent>
				</Card>
			</div>

			<Button
				className='my-8'
				onClick={() => window.history.back()}
				variant={'outline'}
			>
				&larr; Back to Pokemons
			</Button>
		</>
	);
};

export default PokemonDetails;
