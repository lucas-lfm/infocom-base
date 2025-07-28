import { Search, X } from "lucide-react";

import './SearchProduct.css';

function SearchProduct({ searchTerm, setSearchTerm }) {
  return (
    <div className='search-product'>
        <Search className="search-icon" color="#636363" size="20" strokeWidth="3px" />
        <input
            type="text"
            placeholder="Nome do produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>
            <X color="#636363" size="20" strokeWidth="3px" />
        </button>
    </div>
  );
}

export default SearchProduct;