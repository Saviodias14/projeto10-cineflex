import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import SessionContainer from "../../components/SessionContainer"
import SessionsPageNull from "../../components/SessionsPageNull"
import SessionFooter from "../../components/SessionFooter"

export default function SessionsPage({listaSessoes, setListaSessoes}) {
    const filmeId = useParams()
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
           <SessionsPageNull/>
        )
    }
    return (
        <PageContainer>
            Selecione o horário
            <SessionContainer listaSessoes={listaSessoes}/>
            <SessionFooter listaSessoes={listaSessoes}/>

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