import './App.css';

import { Outlet } from 'react-router-dom';
import { ModeToggle } from './components/mode-toggle';

function App() {

	return (
		<>
			<header>
				<ModeToggle />
			</header>
			<main className='flex flex-col items-center'>
				<Outlet />
			</main>
			
		</>
	);
}

export default App;
