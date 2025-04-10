import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CarCard from '../components/CarCard';
import { fetchCars } from '../utils/api';
import { Loader2, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({ brand: '', price: '', fuel: '', seats: '' });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Apply theme on load and when toggled
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const root = document.getElementById('root');
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const loadCars = async () => {
            try {
                setLoading(true);
                const data = await fetchCars({ search, filters, page });
                setCars(data);
                setError(null);
            } catch (err) {
                setError('Failed to load cars');
            } finally {
                setLoading(false);
            }
        };
        loadCars();
    }, [search, filters, page]);

    return (
        <>
            {/* Navbar */}
            <div className={`w-full sticky top-0 z-40 shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white shadow-white/10' : 'bg-white text-black'}`}>
                <div className="flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        🚗 Car Finder
                    </h1>

                    <div className="flex gap-4 items-center">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ rotate: 180, scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Sun className="text-yellow-500" /> : <Moon className="text-white" />}
                        </motion.button>

                        <SearchBar setSearch={setSearch} />

                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none"
                        >
                            Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div className={`p-4 max-w-7xl mx-auto pb-32 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <FilterBar filters={filters} setFilters={setFilters} theme={theme} />

                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500 mt-10">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {cars.length === 0 ? (
                            <div className='w-auto h-screen mx-auto'> No cars found matching your criteria.</div>
                        ) : (
                            cars.map((car) => <CarCard key={car.id} car={car} />)
                        )}

                    </div>
                )}

                {/* Pagination */}
                <div className={`fixed bottom-0 left-0 w-full border-t z-50 flex justify-center gap-4 p-4 transition-colors duration-300
                    ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
