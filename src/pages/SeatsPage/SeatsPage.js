import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import SeatsCaption from "../../components/SeatsCaption"
import SeatsPageNull from "../../components/SeatsPageNull"

export default function SeatsPage({nome, setNome, cpf, setCpf, arrayAssentos, setArrayAssentos, listaAssentos, setListaAssentos}) {
    const horarioId = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${horarioId.idSessao}/seats`)
        promisse.then((lista) => {
            setListaAssentos(lista.data)
        })
        promisse.catch((err) => console.log(err.response.data))
    }, [])

    function escolheAssento(i, assento) {
        if (!listaAssentos.seats[i].isAvailable) {
            alert('Esse assento não está disponível! Escolha outro.')
        }
        if (arrayAssentos.includes(assento)) {
            const novoArray = arrayAssentos.filter((item) => item !== assento)
            setArrayAssentos(novoArray)
            console.log(novoArray)
        } else {
            let novoArray = [...arrayAssentos]
            novoArray.push(assento)
            setArrayAssentos(novoArray)
            console.log(novoArray)
        }
    }
    function enviar(e){
        e.preventDefault()
        const promisse = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',{
        ids: arrayAssentos.map((o)=>o.id),
        name: nome,
        cpf:cpf})
        console.log({
            ids: arrayAssentos.map((o)=>o.id),
            name: nome,
            cpf:cpf})
        promisse.then((res)=>{
            console.log(res.data)
            navigate('/sucesso')
        })
        promisse.catch((err)=>{
            console.log(err.response.data)
        })
    }
    if (!listaAssentos.seats) {
        return (
            <SeatsPageNull/>
        )
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {listaAssentos.seats.map((n, i) => (
                    <SeatItem pode={n.isAvailable} clique={arrayAssentos.includes(n)} onClick={() => escolheAssento(i, n)} key={n.id}>{n.name<10?`0${n.name}`:n.name}</SeatItem>))}
            </SeatsContainer>

            <SeatsCaption/>

            <FormContainer>
                <form onSubmit={enviar}>
                    <label htmlFor="name">Nome do Comprador:</label>
                    <input type='text' id="name" value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Digite seu nome..." />

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input type='text' id="cpf" value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="Digite seu CPF..." />

                    <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={listaAssentos.movie.posterURL} alt={listaAssentos.movie.title} />
                </div>
                <div>
                    <p>{listaAssentos.movie.title}</p>
                    <p>{listaAssentos.day.weekday} - {listaAssentos.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
    a{
        text-decoration:none;
    }
`
const SeatItem = styled.div`
    border: ${props => !props.pode ? '1px solid #F7C52B' : props.clique ? '1px solid #0E7D71' : '1px solid #7B8B99'};         // Essa cor deve mudar
    background-color: ${props => !props.pode ? '#FBE192' : props.clique ? '#1AAE9E' : '#C3CFD9'};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`