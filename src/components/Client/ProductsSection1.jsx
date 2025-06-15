import React from 'react';

const ProductsSection1 = ({ search, setSearch, setCategory, setPriceFilter, setSortOption }) => {
  return (
    <div className='w-[80%] mx-auto mt-8'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold'>Our Products</h1>
        <p className='text-xl text-gray-400'>Discover our wide range of quality products</p>
        <div className='flex gap-3 justify-between h-[10vh] shadow items-center px-5'>
          <input
            type="text"
            placeholder='Search products...'
            className='border rounded w-[60vh] h-[6vh]'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <select onChange={(e) => setCategory(e.target.value)} className="w-52 px-4 py-2 border rounded-md">
            <option>All Categories</option>
            <option>Beverages</option>
            <option>Snacks</option>
            <option>Dairy</option>
            <option>Hygiene</option>
            <option>Candy</option>
          </select>
          <select onChange={(e) => setPriceFilter(e.target.value)} className="w-52 px-4 py-2 border rounded-md">
            <option>All Prices</option>
            <option>Under $5</option>
            <option>$5-$10</option>
            <option>Over $10</option>
          </select>
          <select onChange={(e) => setSortOption(e.target.value)} className="w-52 px-4 py-2 border rounded-md">
            <option>Name A-Z</option>
            <option>Price:Low to High</option>
            <option>Price:High to Low</option>
            <option>Highest rated</option>
            <option>Nevest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection1;
