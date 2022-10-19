import logo from "../img/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Cadastro(){
    return(

        <form>
        <TelaCadastro>
        <img src={logo} alt="logo" />
        <input type="email" placeholder="email"/>
        <input type="password" placeholder="senha"/>
        <input type="name" placeholder="nome"/>
        <input type="link" placeholder="foto"/>
        <button>Cadastrar</button>
        <Link to="/">
        <span>Já tem uma conta? Faça login!</span>
        </Link>
        </TelaCadastro>
        </form>   

    )
}

const TelaCadastro= styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 68px;
img{
    margin-bottom: 32.6px;
}
input{
width: 303px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-bottom: 6px;
}
input:-ms-input-placeholder{
    font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #DBDBDB;
}
button{
width: 303px;
height: 45px;
background: #52B6FF;
border: thin;
border-radius: 4.63636px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
text-align: center;
color: #FFFFFF;
margin-bottom: 25px;
}
span{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;
color: #52B6FF;
}
`