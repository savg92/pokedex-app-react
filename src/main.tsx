import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Pokemons from './pages/pokemons.tsx';
import PokemonDetails from './components/pokemonDetails.tsx';
import { Button } from './components/ui/button.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/pokemon/:name',
				element: <PokemonDetails />,
			},
			{
				path: '/',
				element: <Pokemons />,
			},
		],
		errorElement: <>
			<h1>404</h1>
			<p>Not found</p>
			<Button  onClick={() => router.navigate('/')}>Go to home</Button>
		</>
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}>
				</RouterProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>
);
