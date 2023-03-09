import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import loading from '../assets/loading.gif'

export default function SeatsPage() {
    const horarioId = useParams()
    const [listaAssentos, setListaAssentos] = useState([])
    const [assentoEscolhido, setAssentoEscolhido] = useState([])
    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${horarioId.idSessao}/seats`)
        promisse.then((lista) => {
            setListaAssentos(lista.data)
            setAssentoEscolhido(lista.data.seats.map(()=>false))
        })
        promisse.catch((err) => console.log(err.response.data))
    }, [])

    function escolheAssento(i){
        if(!listaAssentos.seats[i].isAvailable){
            alert('Esse assento não está disponível! Escolha outro.')
        }
        const aux = [...assentoEscolhido]
        aux[i] = !aux[i]
        setAssentoEscolhido(aux)
        console.log(aux)
    }

    if (!listaAssentos.seats) {
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                   <img src={loading}/>
                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle a={1} />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle a={2} />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle a={3} />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <FormContainer>
                    Nome do Comprador:
                    <input placeholder="Digite seu nome..." />

                    CPF do Comprador:
                    <input placeholder="Digite seu CPF..." />

                    <button>Reservar Assento(s)</button>
                </FormContainer>

                <FooterContainer>
                    <div>
                    </div>
                    <div>

                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {listaAssentos.seats.map((n,i) => (
                    <SeatItem pode={n.isAvailable} clique={assentoEscolhido[i]} onClick={()=>escolheAssento(i)} key={n.id}>{n.name}</SeatItem>))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle a={1} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle a={2} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle a={3} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
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
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${props => props.a === 1 ? '1px solid #0E7D71' : props.a === 2 ? '1px solid #7B8B99' : '1px solid #F7C52B'};         // Essa cor deve mudar
    background-color: ${props => props.a === 1 ? '#1AAE9E' : props.a === 2 ? '#C3CFD9' : '#FBE192'};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${props=>!props.pode?'1px solid #F7C52B':props.clique?'1px solid #0E7D71':'1px solid #7B8B99'};         // Essa cor deve mudar
    background-color: ${props=>!props.pode?'#FBE192':props.clique?'#1AAE9E':'#C3CFD9'};    // Essa cor deve mudar
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