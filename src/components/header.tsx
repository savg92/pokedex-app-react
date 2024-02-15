import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

const Header = () => {
	return (
		<header className='flex justify-between items-center bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-90 border-b dark:border-gray-700 p-4 shadow-md sticky top-0 z-10 bg-white'>
			<div className='flex items-center flex-row'>
				<Link to='/'>
					{/* <img
							src='/pokeball.png'
							alt='Pokeball'
							className='w-6 h-6'
						/> */}
					<h1 className='text-3xl font-bold text-center p-5'>Pokedex</h1>
				</Link>
			</div>
			<nav>
				<ul className='flex justify-center space-x-4'>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/favorites'>Favorites</Link>
					</li>
				</ul>
			</nav>
			<ModeToggle />
		</header>
	);
};

export default Header;
