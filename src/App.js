import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import cadastroIcon from './assets/cadastro.png'


function App() {

  const baseUrl = "http://localhost:5000/api/game"
  const [data, setData] = useState([])

  const gameGet = async () => {
    axios.get(baseUrl)
      .then(response => {
        setData(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    gameGet()
  }, [])

  return (
    <div className="App">
      <br />
      <h3>Cadastro de jogos</h3>
      <header>
        <img src={cadastroIcon} className="app-header" />
        <button className="btn btn-success">Incluir novo Jogo</button>
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Multiplayer</th>
            <th>Maior De Idade</th>
            <th>Data de lançamento</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(game => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.nome}</td>
              <td>{game.descricao}</td>
              <td>{game.multiplayer === true ? 'SIM' : 'NÃO'}</td>
              <td>{game.maiorDeIdade === true ? 'SIM' : 'NÃO'}</td>
              <td>{game.dataLancamento}</td>
              <td className="btn btn-outline-primary">Editar</td>
              <td className="btn btn-outline-danger">Excluir</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
