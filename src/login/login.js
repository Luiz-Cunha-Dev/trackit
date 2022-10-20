import logo from "../img/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'
import { useState, useContext  } from "react"
import axios from "axios"
import { ContextoDeAutenticacao } from "../contexto/contexto"
import { useNavigate} from 'react-router';

export default function Login() {
    let navigate = useNavigate();
    const {setUsuario} = useContext(ContextoDeAutenticacao)
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function logar() {
        if (email !== "" && senha !== "") {
            let informacoes =
            {
                email: email,
                password: senha
            }
            console.log(informacoes);
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
            axios.post(URL, informacoes)
                .then(res => {setUsuario(res)
                     console.log(res)
                    navigate("/habitos")})
                .catch(err => console.log(err))
        }
    }         


    return (
            <TelaLogin>
                <img src={logo} alt="logo" />
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <button onClick={logar}>
                        Entrar
                        {/* <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        /> */}
                    </button>
                <StyledLink to="/cadastro">
                    <span>Não tem uma conta? Cadastre-se!</span>
                </StyledLink>
            </TelaLogin>
    )
}

const TelaLogin = styled.div`
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
display: flex;
align-items: center;
justify-content: center;
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
const StyledLink = styled(Link)`
text-decoration: none;
`