import styled from "styled-components"
import Topo from "./topo"
import Menu from "./menu"
import { useState } from "react"

export default function Habitos() {

    const [adicionar, setAdicionar] = useState(false);
    const [novoHabito, setNovoHabito] = useState();

    function criarHabito(){
        
    }


    return (
        <>
            <Topo />
            <Fundo>
                <TelaHabitos>
                    <Titulo>
                        <span>Meus hábitos</span>
                        <button onClick={() => setAdicionar(true)}>+</button>
                    </Titulo>
                    {adicionar !== true ?
                        <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
                        :
                        <>
                        <NovoHabito>
                            <input type="text" placeholder="nome do hábito" />
                            <Dias>
                                <button>D</button>
                                <button>S</button>
                                <button>T</button>
                                <button>Q</button>
                                <button>Q</button>
                                <button>S</button>
                                <button>S</button>
                            </Dias>
                            <span>
                                <p onClick={() => setAdicionar(false)}>Cancelar</p>
                                <button>Salvar</button>
                            </span>
                        </NovoHabito>
                        <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
                        </>
                    }
                </TelaHabitos>
            </Fundo>
            <Menu />
        </>
    )
}

const NovoHabito = styled.div`
width: 340px;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
flex-direction: column;
padding-left: 19px;
padding-top: 18px;
span{
display: flex;
justify-content: end;
align-items: center;
margin-top: 29px;
p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
text-align: center;
color: #52B6FF; 
margin-right: 23px;
}
button{
width: 84px;
height: 35px;
background: #52B6FF;
border-radius: 4.6px;
border: thin;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 20px;
color: #FFFFFF;
margin-right: 30px;
}
}
input{
width: 303px;
height: 45px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 25px;
margin-bottom: 10px;
color: #666666;
:placeholder-shown{
color: #DBDBDB;
}
}
`

const Dias = styled.div`
button{
width: 30px;
height: 30px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 19.976px;
line-height: 25px;
color: #DBDBDB;
margin-right: 4px;
}
`

const TelaHabitos = styled.div`
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
margin-top: 29px;
}
`

const Titulo = styled.div`
display: flex;
justify-content: space-between;
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
border-radius: 4.6px;
border: thin;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 27px;
line-height: 34px;
color: #FFFFFF;
display: flex;
align-items: center;
justify-content: center;
padding-bottom: 5px;
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