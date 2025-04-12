import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../utils/localStorage';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        setWishlist(getWishlist());
    }, []);

    const remove = (id) => {
        removeFromWishlist(id);
        setWishlist(getWishlist());
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen w-screen px-4 max-w-6xl mx-auto">
            <h2 className="pt-10  pb-5 text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600">
                ❤️ Your Wishlist
            </h2>

            {wishlist.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 text-lg">Your wishlist is empty.</p>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {wishlist.map((car) => (
                            <motion.div
                                key={car.id}
                                variants={item}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{car.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{car.brand}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">⛽ Fuel: {car.fuel}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">🪑 Seats: {car.seats}</p>
                                        <p className="text-sm font-medium mt-2 text-green-600 dark:text-green-400">💰 ${car.price}</p>
                                    </div>

                                    <button
                                        onClick={() => remove(car.id)}
                                        className="mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:scale-105 transition"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Wishlist;
