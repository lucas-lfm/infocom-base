import { useEffect, useMemo, useState } from 'react'
import ProductList from  './components/ProductList';
import Button from './components/Button';
import './App.css';
import NavBar from './components/NavBar';
import SearchProduct from './components/SearchProduct';

const ITEMS_PER_PAGE = 8;

function App() {
  const [products, setProducts]      = useState([]);          // lista completa
  const [loading, setLoading]        = useState(true);        // estado de carregando
  const [error, setError]            = useState(null);        // mensagem de erro
  const [visibleCount, setVisibleCount]   = useState(ITEMS_PER_PAGE); // quantos estão visíveis

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch dos produtos
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((resposta) => resposta.json())
      .then(setProducts)
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar produtos baseado no termo de busca
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    return products.filter( (product) => 
                            product.title.toLowerCase()
                            .includes( searchTerm.toLowerCase() )
                          );
  }, [searchTerm, products]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>

      <header>
        <NavBar />
      </header>

      <main>

        <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        { error && <div className="error">{error}</div> }

        { loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            <ProductList products={filteredProducts.slice(0, visibleCount)} />
            <Button
              onClick={handleLoadMore}
              disabled={visibleCount >= filteredProducts.length}
              variant="outline"
              id="load-more"
            >
              
              { visibleCount >= filteredProducts.length
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