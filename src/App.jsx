import { useEffect, useState } from 'react'
import ProductList from  './components/ProductList';
import Button from './components/Button';
import './App.css';

const ITEMS_PER_PAGE = 8;

function App() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dos produtos
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError("Erro ao carregar produtos."))
      .finally(() => setLoading(false));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <main>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <ProductList products={products.slice(0, visibleCount)} />
          <Button
            id="load-more"
            onClick={handleLoadMore}
            disabled={visibleCount >= products.length}
          >
            {visibleCount >= products.length ? "Fim dos produtos" : "Carregar Mais"}
          </Button>
        </>
      )}
    </main>
  );
}

export default App
