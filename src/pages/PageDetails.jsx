// src/pages/CarDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/localStorage';
import { Loader2 } from 'lucide-react';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [wishlisted, setWishlisted] = useState(false);
    const [carsData, setcarsData] = useState([]);
    const getData = async () => {
        const response = await fetch('https://car-db-for-brand-klin.onrender.com/api/data');
        const data = await response.json();
        setcarsData(data);
        console.log(data)

    }
    const [loading, setLoading] = useState(false);
    try {
        setLoading(true);
        getData();
    } catch (error) {
        console.log("error", error);
    } finally {
        setLoading(false);
    }

    useEffect(() => {
        const carFound = carsData.find((c) => String(c.id) === String(id));
        if (!carFound) {
            console.error('Car not found');
            navigate('/'); // Redirect if car not found
        } else {
            setCar(carFound);
            setWishlisted(isInWishlist(carFound.id));
        }
    }, [id, navigate]);

    const toggleWishlist = () => {
        if (!car) return;
        if (wishlisted) {
            removeFromWishlist(car.id);
        } else {
            addToWishlist(car);
        }
        setWishlisted(!wishlisted);
    };

    if (!car) return <p className="text-center mt-10">Loading car details...</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
                ← Back
            </button>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                </div>
            ) : error ? (
                <p className="text-center text-red-500 mt-10">{error}</p>
            ) : (
                <div className="bg-white shadow-md rounded p-6 flex flex-col md:flex-row gap-6">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full md:w-1/2 h-64 object-cover rounded"
                    />

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
                        <p className="text-gray-600 mb-1">Brand: {car.brand}</p>
                        <p className="text-gray-600 mb-1">Fuel Type: {car.fuel}</p>
                        <p className="text-gray-600 mb-1">Seating Capacity: {car.seats}</p>
                        <p className="text-gray-600 mb-1">Price: ${car.price}</p>

                        <button
                            className={`mt-4 px-4 py-2 rounded text-white ${wishlisted ? 'bg-red-500' : 'bg-green-500'
                                }`}
                            onClick={toggleWishlist}
                        >
                            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CarDetails;
