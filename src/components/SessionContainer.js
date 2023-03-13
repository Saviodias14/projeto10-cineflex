import styled from "styled-components"
import { Link } from "react-router-dom"
export default function SessionContainer({listaSessoes}){
    return(
        <div>
                {listaSessoes.days.map((lista)=>(<SessionContainer1 data-test='movie-day' key={lista.id} >
                    {lista.weekday} - {lista.date}
                    <ButtonsContainer>
                        {lista.showtimes.map((h)=>(<Link data-test='showtime' key={h.id} to={`/assentos/${h.id}`}><button>{h.name}</button></Link>))}
                    </ButtonsContainer>
                </SessionContainer1>))}
            </div>
    )
}
const SessionContainer1 = styled.div`
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