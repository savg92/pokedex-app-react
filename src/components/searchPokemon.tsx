import { useState, useCallback } from 'react';
import { Form, useNavigate } from 'react-router-dom';

const SearchPokemon = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (searchTerm) {
                navigate(`/pokemon/${searchTerm}`);
            }
        },
        [navigate, searchTerm]
    );

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                className='flex justify-center gap-4 p-4'
            >
                <input
                    type='text'
                    placeholder='Search by name or id'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white'
                />
                <button
                    type='submit'
                    disabled={!searchTerm}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        !searchTerm ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300' : ''
                    }`}
                >
                    Search
                </button>
            </Form>
        </>
    );
};

export default SearchPokemon;