import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';


const baseUrl = "http://localhost:3001";

class FormCategoriaComponent extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            campName: "",
            listaCategoria: []
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
        })
    }


    render() {
        return (
            <div>

                <div class="form-group col-md-12">
                    <label for="inputPassword4">Nombre de categoria</label>
                    <input type="text" class="form-control" placeholder="Nombre de categoria"
                        value={this.state.campName} onChange={(value) => this.setState({ campName: value.target.value })} />
                </div>


                <button type="submit" class="btn btn-success" onClick={() => this.sendSave()}>Agregar</button>

                <br></br>
                <br></br>
                <div class="row">
                    <table class="table table-hover table-special">
                        <thead class="thead-dark">
                            <tr>

                                <th scope="col">Nombre categoria</th>
                                

                            </tr>
                        </thead>
                        <tbody>

                            {this.loadCategoria()}
                        </tbody>
                    </table>
                </div>


            </div>




        );
    }


    sendSave() {

        const url = baseUrl + "/categoria/crear-categoria";

        //PARAMETROS PARA ENVIAR DATOS
        const datapost = {
            nombre_categoria: this.state.campName
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

    loadCategoria() {
        return this.state.listaCategoria.map((data) => {
            return (<tr>
                <td>{data.nombre_categoria}</td>

            </tr>);
        })
    }
}

export default FormCategoriaComponent;