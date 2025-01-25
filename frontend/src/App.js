import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.png';

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
        <div className="App container py-4">
             {/* Sostituisci il titolo con il logo */}
             <div className="text-center mb-4">
                <img src={logo} alt="Me_Nu Logo" className="logo" />
            </div>
            {categories.length === 0 ? (
                <p className="text-center">Caricamento in corso...</p>
            ) : (
                <div id="categoriesCarousel" className="carousel slide">
                    <div className="carousel-inner">
                        {categories.map((category, index) => (
                            <div 
                                className={`carousel-item ${index === 0 ? 'active' : ''}`} 
                                key={category.id}
                            >
                                <div className="card h-100 mx-auto costum-card" style={{ width: '25rem',  }}>
                                    <div className="card-header">
                                        <h5 className="mb-0">{category.name}</h5>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {category.products.map((product) => (
                                            <li className="list-group-item" key={product.id}>
                                                <div className="d-flex justify-content-between">
                                                    <span>{product.name}</span>
                                                    <span className="text-danger">€{product.price}</span>
                                                </div>
                                                {product.description && (
                                                    <small className="text-muted">{product.description}</small>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controlli per il carosello */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#categoriesCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#categoriesCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;

