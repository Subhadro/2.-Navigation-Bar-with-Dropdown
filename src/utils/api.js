export const fetchCars = async ({ search, filters, page }) => {
    try {
        const response = await fetch('https://car-db-for-brand-klin.onrender.com/api/data');
        const data = await response.json();
        let filteredCars = data;

        console.log("Fetched data:", data);

        // Search by name or brand
        if (search) {
            const query = search.toLowerCase();
            filteredCars = filteredCars.filter(
                (car) =>
                    car.name.toLowerCase().includes(query) ||
                    car.brand.toLowerCase().includes(query)
            );
        }

        // Filter by brand
        if (filters.brand) {
            filteredCars = filteredCars.filter(
                (car) => car.brand.toLowerCase() === filters.brand.toLowerCase()
            );
        }

        // Sort by price
        if (filters.sort === 'low') {
            filteredCars.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'high') {
            filteredCars.sort((a, b) => b.price - a.price);
        }

        // Filter by fuel
        if (filters.fuel) {
            filteredCars = filteredCars.filter(
                (car) => car.fuel.toLowerCase() === filters.fuel.toLowerCase()
            );
        }

        // Filter by price range
        if (filters.price) {
            const [min, max] = filters.price.split('-').map(Number);
            filteredCars = filteredCars.filter(
                (car) => car.price >= min && car.price <= max
            );
        }

        // Filter by seating capacity
        if (filters.seats) {
            filteredCars = filteredCars.filter(
                (car) => car.seats === parseInt(filters.seats)
            );
        }

        // Pagination (10 cars per page)
        const start = (page - 1) * 10;
        const paginatedCars = filteredCars.slice(start, start + 10);

        return paginatedCars;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch cars');
    }
};
