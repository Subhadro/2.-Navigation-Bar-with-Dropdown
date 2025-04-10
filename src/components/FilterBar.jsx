import React from 'react';
import { FaCarSide, FaMoneyBillWave, FaGasPump, FaUsers } from 'react-icons/fa';

const FilterBar = ({ filters, setFilters, theme }) => {
    const baseStyles = `p-2 rounded text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none w-full`;

    const appliedStyles = `${baseStyles} ${theme === 'dark'
        ? 'bg-gray-800 text-white border border-gray-700 placeholder-gray-400'
        : 'bg-white text-black border border-gray-300 placeholder-gray-500'
        } shadow-md hover:shadow-lg`;

    const labelStyles = `text-xs font-semibold flex items-center gap-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {/* Brand Filter */}
            <div className="flex flex-col gap-1">
                <label className={labelStyles}>
                    <FaCarSide /> Brand
                </label>
                <select
                    onChange={e => setFilters({ ...filters, brand: e.target.value })}
                    className={appliedStyles}
                    value={filters.brand}
                >
                    <option value="">All Brands</option>
                    {[
                        'Tesla', 'Toyota', 'Hyundai', 'Honda', 'BMW', 'Audi', 'Kia',
                        'MG', 'Mercedes', 'Ford', 'Mahindra', 'Tata', 'Jeep', 'Volkswagen',
                        'Renault', 'Skoda', 'Nissan', 'Volvo', 'Land Rover', 'Jaguar',
                        'Chevrolet', 'Maruti', 'Suzuki', 'Datsun', 'Mini', 'Porsche',
                        'Lexus', 'Mazda', 'Subaru', 'Fiat'
                    ].map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col gap-1">
                <label className={labelStyles}>
                    <FaMoneyBillWave /> Price
                </label>
                <select
                    onChange={e => setFilters({ ...filters, price: e.target.value })}
                    className={appliedStyles}
                    value={filters.price}
                >
                    <option value="">All Prices</option>
                    <option value="0-15000">Below $15,000</option>
                    <option value="15000-30000">$15,000 - $30,000</option>
                    <option value="30000-50000">$30,000 - $50,000</option>
                    <option value="50000-75000">$50,000 - $75,000</option>
                    <option value="75000-100000">Above $75,000</option>
                </select>
            </div>

            {/* Fuel Type Filter */}
            <div className="flex flex-col gap-1">
                <label className={labelStyles}>
                    <FaGasPump /> Fuel
                </label>
                <select
                    onChange={e => setFilters({ ...filters, fuel: e.target.value })}
                    className={appliedStyles}
                    value={filters.fuel}
                >
                    <option value="">All Fuels</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>

            {/* Seating Capacity Filter */}
            <div className="flex flex-col gap-1">
                <label className={labelStyles}>
                    <FaUsers /> Seats
                </label>
                <select
                    onChange={e => setFilters({ ...filters, seats: e.target.value })}
                    className={appliedStyles}
                    value={filters.seats}
                >
                    <option value="">All Sizes</option>
                    <option value="4">4 Seater</option>
                    <option value="5">5 Seater</option>
                    <option value="7">7 Seater</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
