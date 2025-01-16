import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Assicurati di aver importato Bootstrap

function App() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Richiesta API per ottenere le categorie e i prodotti
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Errore nell\'API:', error));
    }, []);

    return (
        <div className="App">
            <h1>Me_Nu</h1>
            {categories.length === 0 ? (
                <p>Caricamento in corso...</p>
            ) : (
                categories.map((category) => (
                    <div className="category-container" key={category.id}>
                        <h2>{category.name}</h2>
                        <div className="row">
                            {category.products.map((product) => (
                                <div className="col-12 col-md-4" key={product.id}>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            {product.description && <p className="card-text">{product.description}</p>}
                                            <p className="card-text text-danger">€{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;
