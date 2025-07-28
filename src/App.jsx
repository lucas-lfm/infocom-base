import { useEffect, useState } from 'react'
import ProductList from  './components/ProductList';
import Button from './components/Button';
import './App.css';
import NavBar from './components/NavBar';

const ITEMS_PER_PAGE = 8;

function App() {
  const [products, setProducts]      = useState([]);          // lista completa
  const [loading, setLoading]        = useState(true);        // estado de carregando
  const [error, setError]            = useState(null);        // mensagem de erro
  const [visibleCount, setVisibleCount]   = useState(ITEMS_PER_PAGE); // quantos estão visíveis

  // Fetch dos produtos
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((resposta) => resposta.json())
      .then(setProducts)
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>

      <header>
        <NavBar />
      </header>

      <main>
        
        { error && <div className="error">{error}</div> }

        { loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            <ProductList products={products.slice(0, visibleCount)} />
            <Button
              onClick={handleLoadMore}
              disabled={visibleCount >= products.length}
              variant="outline"
              id="load-more"
            >
              
              { visibleCount >= products.length
                ? 'Fim dos produtos'
                : 'Carregar Mais' }
            </Button>
          </>
        ) }
      </main>
    </>
  );
}

export default App;