import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"

export default function App() {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [arrayAssentos, setArrayAssentos] = useState([])
    const [listaAssentos, setListaAssentos] = useState([])
    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/assentos/:idSessao" element={<SeatsPage nome={nome} setNome={setNome} 
                cpf={cpf} setCpf={setCpf} 
                arrayAssentos={arrayAssentos} setArrayAssentos={setArrayAssentos} 
                listaAssentos={listaAssentos} setListaAssentos={setListaAssentos} />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/sucesso" element={ <SuccessPage nome={nome} cpf={cpf} 
                arrayAssentos={arrayAssentos} listaAssentos={listaAssentos} /> } />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
