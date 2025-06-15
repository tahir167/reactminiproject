import React, { useState, useEffect } from 'react';
import ProductsSection1 from '../../components/Client/ProductsSection1';
import Cards from '../../components/Client/Cards';
import controller from '../../services/requests/productsRequest';
import { endpoints } from '../../constants';

const ClientProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    controller.getAll(endpoints.products).then((data) => {
      setProducts([...data]);
    });
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === '' || category === 'All Categories' ? true : product.category === category
    )
    .filter((product) => {
      if (priceFilter === 'Under $5') return product.price < 5;
      if (priceFilter === '$5-$10') return product.price >= 5 && product.price <= 10;
      if (priceFilter === 'Over $10') return product.price > 10;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'Price:Low to High') return a.price - b.price;
      if (sortOption === 'Price:High to Low') return b.price - a.price;
      if (sortOption === 'Highest rated') return b.rating - a.rating;
      if (sortOption === 'Nevest First') return b.id - a.id;
      return 0;
    });

  return (
    <>
      <ProductsSection1
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
        setPriceFilter={setPriceFilter}
        setSortOption={setSortOption}
      />
      <Cards products={filteredProducts} />
    </>
  );
};

export default ClientProducts;
