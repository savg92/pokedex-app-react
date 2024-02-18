import { getPokemon } from '@/services/pokemonApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Car } from 'lucide-react';
import { Ability, Stat, Type } from '@/types';
import { useEffect } from 'react';
import { Button } from './ui/button';

const PokemonDetails = () => {
	const params = useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ['pokemon', params.name],
		queryFn: () => getPokemon(params.name as string),
	});

	useEffect(() => {
		document.title =
			`Pokemon - ${data?.name[0].toUpperCase() + data?.name.slice(1)}` ||
			'Pokemon';
	}, [data]);

	return (
		<>
			<h1 className='text-4xl text-center font-bold'>Pokemon Details</h1>
			<div className='mt-8 flex justify-center items-center'>
				{isLoading ? (
					<Card>
						<CardHeader>
							<CardTitle>Loading...</CardTitle>
						</CardHeader>
						<CardContent>
							<Car size={96} />
						</CardContent>
					</Card>
				) : isError ? (
					<div>Error</div>
				) : (
					<Card className='px-12'>
						<CardHeader>
							<CardTitle>{data.name}</CardTitle>
						</CardHeader>
						<CardContent className='flex flex-row justify-between gap-12'>
							<div className='flex justify-center items-center w-max'>
								<img
									src={data.sprites.other['official-artwork'].front_default}
									alt={data.name}
									className=' w-72 h-72 hover:scale-110 transition-transform duration-300'
								/>
							</div>
							<CardDescription className='flex flex-col gap-6 border-l-2 justify-start pl-12'>
								<div>
									<h2 className='underline'>Id:</h2>
									<p>{data.id}</p>
								</div>
								<div>
									<h2 className='underline'>Base Experience:</h2>
									<p>{data.base_experience}</p>
								</div>
								<div>
									<h2 className='underline'>Abilities:</h2>
									<ul>
										{data.abilities.map((ability: Ability, index: number) => (
											<li
												key={index}
												className='capitalize'
											>
												{ability.ability.name}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h2 className='underline'>Stats:</h2>
									<ul>
										{data.stats.map((stat: Stat, index: number) => (
											<li
												key={index}
												className='capitalize'
											>
												{stat.stat.name}: {stat.base_stat}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h2 className='underline'>Types:</h2>
									<ul>
										{data.types.map((type: Type, index: number) => (
											<li
												key={index}
												className='capitalize'
											>
												{type.type.name}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h2 className='underline'>Weight:</h2>
									<p>{data.weight} lbs</p>
								</div>
								<div>
									<h2 className='underline'>Height:</h2>
									<p>{data.height} ft</p>
								</div>
							</CardDescription>
						</CardContent>
					</Card>
				)}
			</div>

			<Button
				className='block mt-8 text-center'
				onClick={() => window.history.back()}
			>
				&larr; Back to Pokemons
			</Button>
		</>
	);
};

export default PokemonDetails;
