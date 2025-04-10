import React from 'react';

const SearchBar = ({ setSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search cars..."
            className="p-2 border w-full dark:text-black"
            onChange={e => setSearch(e.target.value)}
        />
    );
};

export default SearchBar;