import styled from "styled-components"
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { Link } from "react-router-dom";




export default function Menu(props) {

    return (
        <EstiloMenu>
            <StyledLink to="/habitos">
            <span data-identifier="habit-page-action">Hábitos</span>
            </StyledLink>
            <div style={{ width: "91px" }}>
                <StyledLink to="/hoje">
                <StyledCircularProgressbar
                        value={props.porcentagem}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        strokeWidth={10}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </StyledLink>
            </div>
            <StyledLink to="/historico">
            <span data-identifier="historic-page-action">Histórico</span>
            </StyledLink>
        </EstiloMenu>
    )
}

const EstiloMenu = styled.div`
background-color: #FFFFFF;
z-index: 2;
width: 375px;
height: 70px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
left: 0;
bottom: 0;
width: 100%;
padding-left: 36px;
padding-right: 31px;
span{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
text-align: center;
color: #52B6FF;
}
`

const StyledLink = styled(Link)`
text-decoration: none;
`

const StyledCircularProgressbar = styled(CircularProgressbar)`
margin-bottom: 40px;
`