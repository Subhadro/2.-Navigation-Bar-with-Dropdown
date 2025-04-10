import React from 'react';
import { FaCarSide, FaMoneyBillWave, FaGasPump, FaUsers } from 'react-icons/fa';

const FilterBar = ({ filters, setFilters, theme }) => {
    const baseStyles = `p-2 rounded text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`;
    const lightStyles = `bg-gradient-to-br from-white to-gray-100 text-gray-800 border border-gray-300 shadow-sm hover:shadow-md`;
    const darkStyles = `bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-gray-700 hover:shadow-xl`;

    const labelStyles = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const appliedStyles = `${baseStyles} ${theme === 'dark' ? darkStyles : lightStyles}`;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="flex flex-col gap-1">
                <label className={`text-xs font-semibold flex items-center gap-1 ${labelStyles}`}>
                    <FaCarSide /> Brand
                </label>
                <select
                    onChange={e => setFilters({ ...filters, brand: e.target.value })}
                    className={appliedStyles}
                >
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="">All Brands</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="Toyota">Toyota</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="Ford">Ford</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-xs font-semibold flex items-center gap-1 ${labelStyles}`}>
                    <FaMoneyBillWave /> Price
                </label>
                <select
                    onChange={e => setFilters({ ...filters, sort: e.target.value })}
                    className={appliedStyles}
                >
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="">All Prices</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="low">Low to High</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="high">High to Low</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-xs font-semibold flex items-center gap-1 ${labelStyles}`}>
                    <FaGasPump /> Fuel Type
                </label>
                <select
                    onChange={e => setFilters({ ...filters, fuel: e.target.value })}
                    className={appliedStyles}
                >
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="">All Fuel Types</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="Petrol">Petrol</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="Diesel">Diesel</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className={`text-xs font-semibold flex items-center gap-1 ${labelStyles}`}>
                    <FaUsers /> Seating
                </label>
                <select
                    onChange={e => setFilters({ ...filters, seats: e.target.value })}
                    className={appliedStyles}
                >
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="">All Seating</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="4">4</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="5">5</option>
                    <option className="bg-white text-black dark:bg-gray-800 dark:text-white" value="7">7</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
