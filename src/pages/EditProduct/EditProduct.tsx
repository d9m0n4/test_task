import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import { useProductsStore } from '../../store/useProductsStore';

import './EditProduct.scss';

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { products, setProducts } = useProductsStore();

  const product = products.find((product) => product.id === Number(id));

  const { register, handleSubmit } = useForm({
    defaultValues: product,
  });

  const onSubmit = (data: typeof product) => {
    setProducts(products.map((p) => (p.id === Number(id) ? { ...p, ...data } : p)));
    navigate('/');
  };

  if (!product) return <p>Продукт не найден</p>;

  return (
    <div className="edit-product">
      <h2>Редактировать продукт</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input id="name" {...register('name', { required: true })} />
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена</label>
          <input id="price" {...register('price', { required: true })} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea id="description" {...register('description', { required: true })} />
        </div>

        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};
