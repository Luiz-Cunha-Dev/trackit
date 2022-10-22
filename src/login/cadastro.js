import logo from "../img/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate} from 'react-router';

export default function Cadastro(){
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");

    function mandarCadastro(){
        if(email !== "" && senha !== "" && nome !== "" && imagem !== ""){
            let informacoes =
                {
                    email: email,
                    name: nome,
                    image: imagem,
                    password: senha
                };
            
            console.log(informacoes);
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
            axios.post(URL, informacoes)
            .then(res => console.log(res.data), alert("Cadastrado com sucesso!"), navigate("/"))
            .catch(err => alert(err.response.data.message))
        }
    }






    return(
        <>
        <TelaCadastro>
        <img src={logo} alt="logo" />
        <form>
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)}/>
        <input type="name" placeholder="nome" value={nome} onChange={e => setNome(e.target.value)}/>
        <input type="link" placeholder="foto" value={imagem} onChange={e => setImagem(e.target.value)}/>
        </form>
        <button onClick={mandarCadastro}>Cadastrar</button>
        
        <StyledLink to="/">
        <span>Já tem uma conta? Faça login!</span>
        </StyledLink>
        </TelaCadastro>
        </>
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
form{
display: flex;
flex-direction: column;
}
`

const StyledLink = styled(Link)`
text-decoration: none;
`