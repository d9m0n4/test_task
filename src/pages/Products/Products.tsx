import { useEffect, useState } from 'react';
import { Pagination, ProductCard, Search } from '../../components';
import { useProductsStore } from '../../store/useProductsStore';

import { FilterTypeT, ProductT } from '../../types/types';

import './Products.scss';

export const Products = () => {
  const { products, setProducts } = useProductsStore();

  const [filter, setFilter] = useState<FilterTypeT>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      if (products.length > 0) return;
      try {
        const response = await fetch('https://a97631f7781f1769.mokky.dev/products');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        const productsData = data.map((item: ProductT) => ({
          ...item,
          hasLike: false,
          image: '1.webp',
        }));

        setProducts(productsData);
      } catch {
        console.error('Error fetching');
      }
    };

    fetchData();
  }, [setProducts, products]);

  const filteredProducts =
    filter === 'favorites' ? products.filter((product) => product.hasLike) : products;

  const searchedProducts = filteredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(searchedProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  const handleSetFilter = (value: FilterTypeT) => {
    setCurrentPage(1);
    setFilter(value);
  };

  return (
    <div className="products">
      <div className="products__filter">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleSetFilter('all')}>
          Все
        </button>
        <button
          className={`filter-button ${filter === 'favorites' ? 'active' : ''}`}
          onClick={() => handleSetFilter('favorites')}>
          Избранное
        </button>
      </div>

      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <ul className="products__list">
        {currentProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            hasLike={item.hasLike}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        onChangePage={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};
