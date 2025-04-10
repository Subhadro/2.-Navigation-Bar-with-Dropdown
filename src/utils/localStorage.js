export const getWishlist = () => {
    try {
        return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch {
        return [];
    }
};

export const addToWishlist = (car) => {
    const wishlist = getWishlist();
    if (!wishlist.some(item => item.id === car.id)) {
        localStorage.setItem('wishlist', JSON.stringify([...wishlist, car]));
    }
};

export const removeFromWishlist = (id) => {
    const wishlist = getWishlist().filter(car => car.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const isInWishlist = (id) => {
    return getWishlist().some(car => car.id === id);
};
