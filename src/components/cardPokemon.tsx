import { CardPokemonProps, PokemonType } from '@/types';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

const cardPokemon = ({ name, img, types }: CardPokemonProps) => {
	return (
		<>
			<Card className='w-48 h-64 flex flex-col justify-between hover:shadow-lg dark:hover:shadow-none hover:scale-105 transition-transform duration-300 group'>
				<CardHeader className='flex justify-center items-center'>
					<img
						src={img}
						alt={name}
						className='w-24 h-24 group-hover:scale-125 transition-transform duration-300'
					/>
				</CardHeader>
				<CardContent>
					<CardTitle>{name}</CardTitle>
					<CardDescription>
						{types.map((type: PokemonType, index: number) => (
							<span key={index}>
								{type.type.name}
							</span>
						))}
					</CardDescription>
				</CardContent>
			</Card>
		</>
	);
};

export default cardPokemon;
