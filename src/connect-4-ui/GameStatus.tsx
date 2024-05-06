import styled from "styled-components";

export type GameStatusProps = {
    gameStatus?: number
}

const Wrapper = styled.div`
    text-align: center;
    background-color: blue;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    font-family: monospace;
    border-radius: 0 0 15px 15px;
`

export const GameStatus = ({ gameStatus }: GameStatusProps) => {
    let gameStatusString = "";
    switch (gameStatus) {
        case 0: 
            gameStatusString = "Game in Progress..."
            break
        case 1: 
            gameStatusString = "Player 1 Wins!"
            break
        case 2: 
            gameStatusString = "Player 2 Wins!"
            break 
        case 3: 
            gameStatusString = "It's a Tie!"
            break
    }

    return (
        <Wrapper>
            <p>{gameStatusString}</p>
        </Wrapper>
    )
}