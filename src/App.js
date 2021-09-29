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
  const [modalIncluir, setModalIncluir] = useState(false)
  const [gameSelected, setGameSelected] = useState({
    nome: '',
    descricao: '',
    multiplayer: '',
    maiorDeIdade: '',
    dataLancamento: ''
  })

  const handlerChange = (e) => {
    const { name, value } = e.target
    setGameSelected({
      ...gameSelected,
      [name]: value
    })
    console.log(gameSelected)
  }

  const gameGet = async () => {
    axios.get(baseUrl)
    .then(response => {
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  const gamePost = async () => {
    var GameModel = {
      nome: gameSelected.nome,
      descricao: gameSelected.descricao,
      multiplayer: gameSelected.multiplayer,
      maiorDeIdade: gameSelected.maiorDeIdade,
      dataLancamento: gameSelected.dataLancamento
    }
    axios.post(baseUrl, )
      .then(response => {
        setData(data.concat(response.data))
        abrirModal();
      }).catch(err => {
        console.log(err)
      })
  }

  const abrirModal = () => {
    setModalIncluir(!modalIncluir)
  }

  useEffect(() => {
    gameGet()
  }, [])

  return (
    <div className="game-container">
      <br />
      <h3>Cadastro de jogos</h3>
      <header>
        {/* <img src={cadastroIcon} className="app-header" /> */}
        <button className="btn btn-success" onClick={() => abrirModal()}>Incluir novo Jogo</button>
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Multiplayer</th>
            <th>Maior De Idade</th>
            <th>Lançamento</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(game => (
            <tr key={game.id}>
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

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir novo jogo</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 mt-3">
              <label>Nome: </label>
              <input type="text" name="nome" onChange={handlerChange} className="form-control" />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 mt-3">
              <label>Descrição: </label>
              <input type="text" name="descricao" onChange={handlerChange} className="form-control" />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 mt-3">
              <label>Multiplayer: </label>
              <input type="radio" className="form-check-input" name="multiplayer" onChange={handlerChange} className="" />
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 mt-3">
              <label className="">Maior de Idade?</label>
              <input className="form-check-input" type="radio" name="maiorDeIdade" onChange={handlerChange} className="" />
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-lg-6 mt-3">
            <label className="text-center">Lançamento: </label>
            <input type='datetime-local' step="1" name="dataLancamento" onChange={handlerChange} className="form-control" />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => gamePost()}>Incluir</button>
          <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
