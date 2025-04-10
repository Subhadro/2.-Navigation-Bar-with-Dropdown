import React from 'react';

const SearchBar = ({ setSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search cars..."
<<<<<<< HEAD
            className="p-2 border w-full dark:text-black"
=======
           className="p-2 border w-full dark:text-black"
>>>>>>> cf679f50b1c2f6d71b70fae9c0c624f74137f5dd
            onChange={e => setSearch(e.target.value)}
        />
    );
};

export default SearchBar;
