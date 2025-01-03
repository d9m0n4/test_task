import { Link } from 'react-router';
import { useProductsStore } from '../../store/useProductsStore';

import { LikeIcon } from '../LikeIcon/LikeIcon';
import { EditIcon } from '../EditIcon/EditIcon';

import './ProductCard.scss';

type ProductCardProps = {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
  hasLike?: boolean;
};

export const ProductCard = ({ id, name, price, description, image, hasLike }: ProductCardProps) => {
  const { deleteProduct, toggleLike } = useProductsStore();

  const handleDelete = () => {
    deleteProduct(id);
  };

  const handleLike = () => {
    toggleLike(id);
  };
  return (
    <li className="product-card">
      <Link to={`/products/${id}`} className="product-card__link">
        <img src={image} alt={name} />
        <div className="product-card__info">
          <h3>{name}</h3>
          <p>{description}</p>
          <span>{price}</span>
        </div>
      </Link>
      <button className="product-card__delete" onClick={handleDelete}>
        Удалить
      </button>
      <button className="product-card__like" onClick={handleLike}>
        <LikeIcon className={`${hasLike ? 'active' : ''}`} />
      </button>
      <Link to={`/products/${id}/edit`} className="product-card__edit">
        <EditIcon />
      </Link>
    </li>
  );
};
