import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';


const baseUrl = "http://localhost:3001";

class FormProductoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campnombre: "",
            campprecio: "",
            campcantidad: 0,
            idCategoria: 0,
            listaCategoria: [],
            listaProducto: []

        }
    }


    componentDidMount() {

        const url = baseUrl + "/categoria/list";

        axios.get(url).then(response => {


            const data = response.data.data;
            console.log(response)

            this.setState({ listaCategoria: data })

            console.log(this.state.listaCategoria)

        }).catch(error => {
            alert("error 325")
        });


        //para listar alos productos

        const url2 = baseUrl + "/producto/list";

        axios.get(url2).then(response => {


            const data = response.data.data;
            console.log(response)

            this.setState({ listaProducto: data })

            console.log(this.state.listaProducto)

        }).catch(error => {
            alert("error 325")
        })
    }
    render() {
        return (
            <div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="inputnombre">Nombre de Producto</label>
                        <input type="text" class="form-control" placeholder="Nombre de producto"
                            value={this.state.campnombre} onChange={(value) => this.setState({ campnombre: value.target.value })} id="inputnombre"
                        />
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputprecio">Precio</label>
                        <input type="text" class="form-control" placeholder="Precio" id="inputprecio"
                            value={this.state.campprecio} onChange={(value) => this.setState({ campprecio: value.target.value })} />
                    </div>

                    <div class="form-group col-md-12">
                        <label for="inputcantidad">Cantidad</label>
                        <input type="text" class="form-control" placeholder="Cantidad" id="inputcantidad"
                            value={this.state.campcantidad} onChange={(value) => this.setState({ campcantidad: value.target.value })} />
                    </div>

                    <div class="form-group col-md-12">
                        <label for="inputcategoria">Selelcione categoria</label>
                        <select id="inputcategoria" class="form-control" onChange={(value) => this.setState({ idCategoria: value.target.value })}>
                            <option value="">Selecione opcion...</option>
                            {this.loadCategoria()}
                        </select>
                    </div>



                    <button type="submit" class="btn btn-primary" onClick={() => this.sendSave()}>Agregar</button>

                </div>
                <br></br>

                <br></br>
                <div class="row">
                    <table class="table table-hover table-special">
                        <thead class="thead-dark">
                            <tr>

                                <th scope="col">Nombre producto</th>
                                <th scope="col">Precio producto</th>
                                <th scope="col">Cantidad producto</th>
                                <th scope="col">Acciones</th>

                            </tr>
                        </thead>
                        <tbody>

                            {this.loadProducto()}
                        </tbody>
                    </table>
                </div>


            </div>

        );
    }

    loadCategoria() {
        return this.state.listaCategoria.map((data) => {
            return (<option value={data.id_categoria}>{data.nombre_categoria}</option>


            );
        })
    }



    sendSave() {

        const url = baseUrl + "/producto/crear-producto";

        //PARAMETROS PARA ENVIAR DATOS
        const datapost = {
            nombre_producto: this.state.campnombre,
            precio_producto: this.state.campprecio,
            cantidad_producto: this.state.campcantidad,
            id_categoria: this.state.idCategoria
        }
        axios.post(url, datapost).then(response => {
            console.log(response);
            if (response.data.success) {
                alert(response.data.mensaje);
                window.location.reload();

            } else {
                alert("error");
            }
        }).catch(error => {
            alert("error 325")
        })
    }



    loadProducto() {
        return this.state.listaProducto.map((data) => {
            return (<tr>
                <td>{data.nombre_producto}</td>
                <td>{data.precio_producto}</td>
                <td>{data.cantidad_producto}</td>
                <td><button class="btn btn-danger" onClick={() => this.onDelete(data.id_producto)}>Eliminar</button></td>
            </tr>);
        })
    }


    onDelete(id) {
        const url = baseUrl + "/producto/eliminar-producto"    // parameter data post
        // network
        axios.post(url, {
            id_producto: id
        })
            .then(response => {

                alert("eliminado");
                //para actualizar la pagina
                window.location.reload();
            })
            .catch(error => {
                alert("Error 325 ")
            })
    }


}

export default FormProductoComponent;