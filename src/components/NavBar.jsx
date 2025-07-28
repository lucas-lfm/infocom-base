import { ShoppingCart } from 'lucide-react';

import './NavBar.css';

function NavBar() {

    return (
        <nav className='top-nav'>
            <div className="brand">Info<span>Com</span></div>
            <div className="right">
                <ShoppingCart />
                <span>Entrar</span>
            </div>
        </nav>
    );

}

export default NavBar;