### Pokedex - React

This is a simple pokedex app that uses the [PokeAPI](https://pokeapi.co/) to display information about different pokemons. The app is built using Remix and TailwindCSS.

## Features

- Search for pokemons by name
- View detailed information about a pokemon
- View a list of all pokemons with pagination (original 151 pokemons, 10 per page; in case you want to see all pokemons, you can change the limit in the `getPokemons` function in `src/pages/pokemons.tsx`)

## Installation

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

```bash
bun install
```

3. Start the development server

```bash
npm run dev
```

```bash
bun dev
```

4. Open the app in your browser at `http://localhost:5173`

## Technologies

- [Node.js](https://nodejs.org/en/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Dom](https://reactrouter.com/web/guides/quick-start)
- [React Query](https://react-query.tanstack.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [PokeAPI](https://pokeapi.co/)
- [Mantine Hooks](https://mantine.dev/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://pokedex-app-remix.vercel.app/)