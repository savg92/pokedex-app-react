import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { ModeToggle } from './components/mode-toggle';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
      <ModeToggle />
			<div>
				<a
					href='https://vitejs.dev'
					target='_blank'
				>
					<img
						src={viteLogo}
						className='logo'
						alt='Vite logo'
					/>
				</a>
				<a
					href='https://react.dev'
					target='_blank'
				>
					<img
						src={reactLogo}
						className='logo react'
						alt='React logo'
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>

			<div>
				<Button>Click me</Button>
			</div>
			<div>
				<Alert>
					<Terminal className='h-4 w-4' />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>
						You can add components and dependencies to your app using the cli.
					</AlertDescription>
				</Alert>
			</div>

			<div className='w-5/6 m-auto'>
				<Carousel>
					<CarouselContent>
						<CarouselItem className='basis-1/3'>
							<img
								src='https://via.placeholder.com/300'
								alt='placeholder'
							/>
						</CarouselItem>
						<CarouselItem className='basis-1/3'>
							<img
								src='https://via.placeholder.com/300'
								alt='placeholder'
							/>
						</CarouselItem>
						<CarouselItem className='basis-1/3'>
							<img
								src='https://via.placeholder.com/300'
								alt='placeholder'
							/>
						</CarouselItem>
						<CarouselItem className='basis-1/3'>
							<img
								src='https://via.placeholder.com/300'
								alt='placeholder'
							/>
						</CarouselItem>
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</>
	);
}

export default App;
