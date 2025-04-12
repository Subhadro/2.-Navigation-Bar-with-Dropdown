import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaGasPump, FaChair, FaDollarSign, FaCarSide } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../utils/localStorage';
import { Loader2 } from 'lucide-react'; // Assuming you have this icon

const CardDetails = () => {
    const [wishlisted, setWishlisted] = useState(false);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://car-db-for-brand-klin.onrender.com/api/data');
                const data = await response.json();
                const foundCar = data.find((carData) => String(carData.id) === id);

                setCar(foundCar);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch car details');
                setLoading(false);
            }
        };

        getData();
    }, [id]);

    const toggleWishlist = () => {
        if (!car) return;
        if (wishlisted) {
            removeFromWishlist(car.id);
        } else {
            addToWishlist(car);
        }
        setWishlisted(!wishlisted);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-500 mt-10">{error}</p>
        );
    }

    if (!car) {
        return (
            <p className="text-center mt-10 text-lg text-gray-600 dark:text-gray-300">
                No car selected
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-600 dark:text-blue-400 hover:underline mb-6 text-sm"
            >
                ← Go Back
            </button>

            <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-6 transition duration-300 ">
                <div className="md:w-1/2">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-80 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    />
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-between text-gray-800 dark:text-white">
                    <div>
                        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 dark:text-blue-400">{car.name}</h1>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm">
                                <FaCarSide /> {car.brand}
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-sm">
                                <FaGasPump /> {car.fuel}
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 text-sm">
                                <FaChair /> {car.seats} Seats
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 text-sm">
                                <FaDollarSign /> ${car.price}
                            </span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">About this Car</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {car.description ||
                                    "This car offers a perfect balance of comfort, performance, and affordability. Designed for modern users, it delivers excellent mileage, top-notch safety features, and stylish looks for both city and highway drives."}
                            </p>
                        </div>
                    </div>

                    <button
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition duration-200 self-start shadow-md"
                        onClick={toggleWishlist}
                    >
                        {wishlisted ? '💔 Remove from Wishlist' : '💙 Add to Wishlist'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;
