import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


const baseUrl = "http://localhost:3001";

class EditProductoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campnombre: "",
            campprecio: 0,
            campcantidad: 0, producto: [],
            listaCategoria: [],
            campCategoria:""

        }
    }

    componentDidMount() {

        //parametros de id de usuario
        let idproducto = this.props.match.params.idProducto;
        console.log(this.props.match.params);
        const url2 = baseUrl + "/producto/obtener-producto/" + idproducto;



        const url = baseUrl + "/categoria/list";

        axios.get(url).then(response => {


            const data = response.data.data;
            console.log(response)

            this.setState({ listaCategoria: data })

            console.log(this.state.listaCategoria)

        }).catch(error => {
            alert("error 325")
        });


        axios.get(url2).then(response => {


            const data = response.data.data[0];
            console.log(data)

            this.setState({
                producto: data,
                campnombre: data.nombre_producto,
                campprecio: data.precio_producto,
                campcantidad: data.cantidad_producto,
                campCategoria:data.id_categoria
            
            })


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
                    <button type="submit" class="btn btn-primary" onClick={() => this.actualizar()} >Actualizar</button>

                </div>
                <br></br>

                <div class="row">

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

    actualizar(){
        let idproducto = this.props.match.params.idProducto;
        const url = baseUrl + "/producto/actualizar-producto/"+idproducto;

        //PARAMETROS PARA ENVIAR DATOS
        const datapost = {
            nombre_producto: this.state.campnombre,
            precio_producto: this.state.campprecio,
            cantidad_producto: this.state.campcantidad,
            id_categoria: this.state.campCategoria
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

    

}

export default EditProductoComponent;