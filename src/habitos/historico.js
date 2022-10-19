import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"

export default function Historico() {
    return (
        <>
            <Topo />
            <Fundo>
                <TelaHistorico>
                    <Titulo>
                        <span>Histórico</span>
                        <button>+</button>
                    </Titulo>
                    <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
                </TelaHistorico>
            </Fundo>
            <Menu />
        </>
    )
}

const TelaHistorico = styled.div`
width: 100%;
margin-top: 98px;
padding-left: 17px;
padding-right: 18px;
span{
width: 338px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666;
display: flex;
}
`

const Titulo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 28px;
span{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
}
button{
width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
border: thin;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 26.976px;
line-height: 34px;
text-align: center;
color: #FFFFFF;
}
`

const Fundo = styled.div`
z-index: 0;
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background: #E5E5E5;
`