import React from 'react';
import ReactDOM from 'react-dom/client';  // Importa dal modulo "react-dom/client" per React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


// Crea un "root" per il rendering della nostra app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Usa il metodo .render() per rendere il componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Funzione opzionale per monitorare le performance dell'app (facoltativo)
reportWebVitals();
