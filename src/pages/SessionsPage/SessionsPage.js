import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

export default function SessionsPage() {
    const filmeId = useParams()
    const [listaSessoes, setListaSessoes] = useState([])
    console.log(filmeId.idFilme)
    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${filmeId.idFilme}/showtimes`)
        promisse.then((lista)=>{
            console.log(lista.data)
            setListaSessoes(lista.data)
        })
        promisse.catch((err)=>console.log(err.response.data))
    },[])
    if(!listaSessoes.days){
        return(
            <PageContainer>
            Selecione o horário
            <div>
            
            </div>

            <FooterContainer>
            
            </FooterContainer>

        </PageContainer>
        )
    }
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {listaSessoes.days.map((lista)=>(<SessionContainer key={lista.id} >
                    {lista.weekday} - {lista.date}
                    <ButtonsContainer>
                        {lista.showtimes.map((h)=>(<button key={h.id}>{h.name}</button>))}
                    </ButtonsContainer>
                </SessionContainer>))}
            </div>

            <FooterContainer>
                <div>
                    <img src={listaSessoes.posterURL} alt={listaSessoes.title} />
                </div>
                <div>
                    <p>{listaSessoes.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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