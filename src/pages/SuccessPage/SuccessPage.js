import styled from "styled-components"
import { Link } from "react-router-dom"
import SuccessPageNull from "../../components/SuccessPageNull"

export default function SuccessPage({ nome, cpf, arrayAssentos, listaAssentos, setArrayAssentos, setCpf, setListaAssentos, setListaSessoes, setNome }) {
    if (!listaAssentos) {
        return (
            <SuccessPageNull arrayAssentos={arrayAssentos} nome={nome} cpf={cpf} />
        )
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test='movie-info'>
                <strong><p>Filme e sessão</p></strong>
                <p>{listaAssentos.movie.title}</p>
                <p>{listaAssentos.day.date} - {listaAssentos.name}</p>
            </TextContainer>

            <TextContainer data-test='seats-info'>
                <strong><p>Ingressos</p></strong>
                {arrayAssentos.map((o) => (<p>Assento {o.name < 10 ? `0${o.name}` : o.name}</p>))}
            </TextContainer>

            <TextContainer data-test='client-info'>
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link data-test='go-home-btn' to={'/'} onClick={() => {
                setArrayAssentos([])
                setCpf('')
                setListaAssentos([])
                setListaSessoes([])
                setNome('')
            }}><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`