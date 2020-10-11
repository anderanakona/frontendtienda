import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import FormCategoriaComponent from './componentes/categoria/FormCategoria';
import FormProductoComponent from './componentes/producto/FormProducto';
import EditProductoComponent from './componentes/producto/EditProducto';



function App() {
  return (
    <Router>

      <div className="App">

        <nav class="navbar navbar-expand-lg  navbar-dark bg-primary">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="/crear-producto">Productos</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/crear-categoria">Categorias</Link>
              </li>
            </ul>

          </div>
        </nav>

        <div class="container py-4">
          <div class="row">
          <Route path="/crear-categoria" exact component={FormCategoriaComponent} />
          <Route path="/crear-producto" exact component={FormProductoComponent} />
          <Route path="/editar-producto/:idProducto" exact component={EditProductoComponent} />

          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;