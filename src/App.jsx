import { useEffect, useState } from 'react'
import ProductList from  './components/ProductList';
import Button from './components/Button';
import './App.css';

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
    <main>
       {/* se error for verdadeiro (true), exibe mensagem de erro */}
      { error && <div className="error">{error}</div> }

      {/* se loading for true, exibe uma mensagem de carregamento, se for false renderiza os componentes ProductList e Button */}
      { loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <ProductList products={products.slice(0, visibleCount)} />
          <Button
            onClick={handleLoadMore}
            disabled={visibleCount >= products.length}
            style={visibleCount >= products.length ? {backgroundColor: "#cccccc"} : {}}
          >
            {/* se a quantidade de itens visíveis for igual ou maior do que o tamanho da lista de produtos, 
            significa que todos os produtos já foram exibidos, entáo o botão passa a ter o texto "Fim dos produtos", 
            senão... exibe "Carregar Mais" */}
            { visibleCount >= products.length
              ? 'Fim dos produtos'
              : 'Carregar Mais' }
          </Button>
        </>
      ) }
    </main>
  );
}

export default App;