import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.png';
import Hammer from 'hammerjs'; // Importa Hammer.js per gestire lo swipe

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const carouselRef = useRef(null); // Riferimento al carosello

    useEffect(() => {
        // Richiesta API per ottenere le categorie e i prodotti
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error('Errore nell\'API:', error));

        // Inizializza il carosello manualmente
        if (carouselRef.current) {
            const carousel = new window.bootstrap.Carousel(carouselRef.current, {
                interval: false, // Disabilita lo scorrimento automatico
            });

            // Aggiungi supporto per lo swipe su dispositivi mobili
            const hammer = new Hammer(carouselRef.current);
            hammer.on('swipeleft', () => carousel.next());
            hammer.on('swiperight', () => carousel.prev());
        }
    }, []);

    // Funzione per gestire la selezione di una sottocategoria
    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    // Funzione per deselezionare la sottocategoria e mostrare tutti i prodotti
    const handleShowAll = () => {
        setSelectedSubcategory(null);
    };

    // Funzione per raggruppare i prodotti per sottocategoria
    const getAllProductsGroupedBySubcategory = (category) => {
        const groupedProducts = [];

        // Aggiungi i prodotti della categoria principale
        if (category.products.length > 0) {
            groupedProducts.push({
                subcategoryName: null, // Nessuna sottocategoria
                products: category.products,
            });
        }

        // Aggiungi i prodotti delle sottocategorie
        if (category.children) {
            category.children.forEach((subcategory) => {
                if (subcategory.products.length > 0) {
                    groupedProducts.push({
                        subcategoryName: subcategory.name, // Nome della sottocategoria
                        products: subcategory.products,
                    });
                }
            });
        }

        return groupedProducts;
    };

    return (
        <div className="App container py-4">
            {/* Logo */}
            <div className="text-center mb-4">
                <img src={logo} alt="Me_Nu Logo" className="logo" />
            </div>

            {categories.length === 0 ? (
                <p className="text-center">Caricamento in corso...</p>
            ) : (
                <div id="categoriesCarousel" className="carousel slide" ref={carouselRef}>
                    <div className="carousel-inner">
                        {categories.map((category, index) => (
                            <div
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                key={category.id}
                            >
                                <div className="card h-100 mx-auto costum-card" style={{ width: '25rem' }}>
                                    <div className="card-header">
                                        <h5 className="mb-0">{category.name}</h5>
                                    </div>

                                    {/* Mostra le sottocategorie solo se esistono */}
                                    {category.children && category.children.length > 0 ? (
                                        <div className="card-body">
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                {/* Pulsante "Mostra tutto" */}
                                                <button
                                                    className={`btn-all btn-outline-primary btn-sm ${
                                                        selectedSubcategory === null ? 'active' : ''
                                                    }`}
                                                    onClick={handleShowAll}
                                                >
                                                    Lista completa
                                                </button>

                                                {/* Pulsanti per le sottocategorie */}
                                                {category.children.map((subcategory) => (
                                                    <button
                                                        key={subcategory.id}
                                                        className={`btn-category btn-outline-primary btn-sm ${
                                                            selectedSubcategory?.id === subcategory.id ? 'active' : ''
                                                        }`}
                                                        onClick={() => handleSubcategoryClick(subcategory)}
                                                    >
                                                        {subcategory.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Mostra i prodotti */}
                                    <ul className="list-group list-group-flush">
                                        {selectedSubcategory ? (
                                            // Mostra solo i prodotti della sottocategoria selezionata
                                            selectedSubcategory.products.map((product) => (
                                                <li className="list-group-item" key={product.id}>
                                                    <div className="d-flex justify-content-between">
                                                        <span>{product.name}</span>
                                                        <span className="text-danger">€{product.price}</span>
                                                    </div>
                                                    {product.description && (
                                                        <small className="text-muted">{product.description}</small>
                                                    )}
                                                </li>
                                            ))
                                        ) : (
                                            // Mostra i prodotti raggruppati per sottocategoria
                                            getAllProductsGroupedBySubcategory(category).map((group, index) => (
                                                <React.Fragment key={index}>
                                                    {/* Intestazione della sottocategoria */}
                                                    {group.subcategoryName && (
                                                        <li className="list-group-item bg-light">
                                                            <strong>{group.subcategoryName}</strong>
                                                        </li>
                                                    )}
                                                    {/* Lista dei prodotti della sottocategoria */}
                                                    {group.products.map((product) => (
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
                                                </React.Fragment>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controlli per il carosello (PREV/NEXT) */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#categoriesCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#categoriesCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;

