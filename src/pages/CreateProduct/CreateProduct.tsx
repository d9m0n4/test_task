import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useProductsStore } from '../../store/useProductsStore';

import './CreateProduct.scss';

type FormData = {
  name: string;
  price: string;
  description: string;
  image?: string;
};

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useProductsStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newProduct = {
      id: products.length + 1,
      ...data,
      image: data.image || '1.webp',
      hasLike: false,
    };

    setProducts([...products, newProduct]);
    navigate('/');
  };

  return (
    <div className="create-product">
      <h2>Создать продукт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input id="name" {...register('name', { required: 'Название обязательно' })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена</label>
          <input
            id="price"
            type="text"
            {...register('price', {
              required: 'Цена обязательна',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Цена должна быть числом',
              },
            })}
          />
          {errors.price && <span className="error">{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            {...register('description', { required: 'Описание обязательно' })}
          />
          {errors.description && <span className="error">{errors.description.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">URL изображения (опционально)</label>
          <input id="image" {...register('image')} />
        </div>

        <button type="submit" className="submit-button">
          Сохранить
        </button>
      </form>
    </div>
  );
};
