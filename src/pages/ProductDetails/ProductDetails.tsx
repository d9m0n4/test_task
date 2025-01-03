import { useNavigate, useParams } from 'react-router';
import { useProductsStore } from '../../store/useProductsStore';

import './ProductDetails.scss';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsStore();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="product">
      <div className="product-details">
        <img src="/1.webp" alt={product.name} />
        <div className="product-details__info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span>{product.price}</span>
        </div>
      </div>
      <div className="product-goback">
        <button onClick={() => navigate(-1)} type="button">
          Вернуться к списку товаров
        </button>
      </div>
    </div>
  );
};
