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
    const [botaoLogar, setBotaoLogar] = useState("Entar")
    const [fundoInput, setFundoInput] = useState("#FFFFFF")
    const [cor, setCor] = useState("#666666")

    function logar() {
        if (email !== "" && senha !== "") {
            setBotaoLogar(<ThreeDots
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />)
            setFundoInput("#F2F2F2")
            setCor("#AFAFAF")

            let informacoes =
            {
                email: email,
                password: senha
            }
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
            axios.post(URL, informacoes)
                .then(res => {setUsuario(res)
                    localStorage.removeItem("usuarioLocal");
                    localStorage.setItem("usuarioLocal", JSON.stringify(res));
                    navigate("/hoje")})
                .catch(err => {
                    alert(err.response.data.message)
                    setFundoInput("#FFFFFF")
                    setCor("#666666")
                    setBotaoLogar("Entrar")
                })
        }
    }         


    return (
            <TelaLogin>
                <img src={logo} alt="logo" />
                <InputLogin data-identifier="input-email" cor={cor} corFundo={fundoInput} type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <InputLogin data-identifier="input-password" cor={cor} corFundo={fundoInput} type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <button data-identifier="login-btn" onClick={logar}>{botaoLogar}</button>
                <StyledLink to="/cadastro">
                    <span data-identifier="sign-up-action">Não tem uma conta? Cadastre-se!</span>
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

const InputLogin = styled.input`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
width: 303px;
height: 45px;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-bottom: 6px;
color: ${props => props.cor};
background-color: ${props => props.corFundo};
::placeholder{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #DBDBDB;
background: ${props => props.corFundo};
}
`

const StyledLink = styled(Link)`
text-decoration: none;
`