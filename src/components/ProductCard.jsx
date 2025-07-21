import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <div className="separator"></div>

      <div className="price">
        R$ {product.price.toFixed(2).replace('.', ',')}
      </div>
      <h3 className='title'>{product.title}</h3>
    </div>
  );
}

export default ProductCard;