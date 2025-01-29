import React, { Component } from 'react';
import Main from '../templates/Main';
import axios from 'axios';
import './UserCrud.css';
//este arquivo terá estado. Assim foi necessário importar o Component
//será criado uma classe neste aquivo, assim facilitará a manipulação dos dados do estado.
//importando o axios para conectar com o backend

//url de conexão com o backend e manipulação dos usuários
//const baseUrl = 'http://localhost:3001/user'
const baseUrl = 'https://backend-cadastrorapido.onrender.com/user';


//inicializando o estado do componente atual
const initialState = {
    user: {name: '', email: ''},
    list: []
}

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

export default class UserCrud extends Component {

    state = { ...initialState }

    //função para buscar os dados do backend (arquivo db.json)
    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        }).catch(error => {
            console.error("Erro ao carregar os dados:", error);
        });
    }
    
    //função para limpar o estado atual, caso ele já esteja preenchido
    clear() {
        this.setState({ user: initialState.user })
    }

    //função para gravar um novo usuário ou para alterar
    save() {
        const user = this.state.user;
        const method = user.id ? 'put' : 'post' //Se o user.id estiver setado não será um novo usuário e utilizaremos o put, caso contrário é um novo usuário e será usado o método post
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl //Se o user.id estiver setado é uma atualização e nela precisa contar o id no usuário que será alterado, caso contrário, nenhum id será incluído na url
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ user: initialState.user, list })
            })
    }

    //função para atualizar a lista de usuários colocando o novo usuário ou usuário atualizado no topo
    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id);
        list.unshift(user)
        return list;
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })

    }

    renderForm() {
        return(
            <div className='form'>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className='form-control' name='name' value={this.state.user.name} onChange={e => this.updateField(e)} placeholder='Digite o nome...'/>

                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type='text' className='form-control' name='email' value={this.state.user.email} onChange={e => this.updateField(e)} placeholder='Digite o e-mail...'/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary buttons" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary buttons" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    //carregar usuário
    load(user){
        this.setState({ user })
    }
    
    //remover usuário
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp  =>{
            const list = this.state.list.filter(u => u.id !== user.id);
            this.setState({ list })
        })
    }

    //Função para renderizar uma tabela com os dados dos usuários cadastrados
    renderTable(){
        return (
            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user =>{
            return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button className="btn btn-warning buttons" onClick={() => this.load(user)}><i className='fa fa-pencil'></i></button>
                    <button className="btn btn-danger buttons" onClick={() => this.remove(user)}><i className='fa fa-trash'></i></button>
                </td>
            </tr>
            )
        })
    }          

    render() {
        
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}