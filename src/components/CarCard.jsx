import React, { useState, useEffect } from 'react';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
    const [wishlisted, setWishlisted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setWishlisted(isInWishlist(car.id));
    }, [car.id]);

    const toggleWishlist = () => {
        if (wishlisted) {
            removeFromWishlist(car.id);
        } else {
            addToWishlist(car);
        }
        setWishlisted(!wishlisted);
    };

    return (
        <div className="group relative border border-gray-300 dark:border-gray-700 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900">
            {/* Car Content */}
            <div className="group-hover:blur-sm transition duration-300">
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-40 object-cover mb-3 rounded-md"
                />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{car.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    🚗 Fuel: {car.fuel} &nbsp; | &nbsp; 👥 Seats: {car.seats} &nbsp; | &nbsp; 💵 ${car.price}
                </p>
            </div>

            {/* Overlay with Buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-4">
                <button
                    onClick={() => navigate(`/car/${car.id}`)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
                >
                    View Details
                </button>
                <button
                    onClick={toggleWishlist}
                    className="bg-white text-blue-600 border border-blue-500 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-50 transition"
                >
                    {wishlisted ? '💔 Remove from Wishlist' : '💖 Add to Wishlist'}
                </button>
            </div>
        </div>
    );
};

export default CarCard;
