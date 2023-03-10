import styled from "styled-components"
export default function SeatsCaption(){
    return(
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
    )
}
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