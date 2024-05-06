import styled from "styled-components"

export type PlayerRoundOverviewProps = {
    playerNumber: 1 | 2,
    isActive: boolean,
    remainingDisks?: number,
    playerColor: string
}

const Wrapper = styled.div`
    margin: 5px;
    display: flex;
    justify-content: end;
    flex-direction: column;
    background-color: lightblue;
    color: blue;
    padding: 10px 20px 35px 20px;
    font-family: monospace;
    flex: 1;
    border-radius: 10px;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 2.4rem;
    margin-bottom: 10px;
`
const Token = styled.div<{ isActive: boolean, playerColor: string }>`
    background-color: ${ (props) => props.isActive ? props.playerColor : "initial"};
    border-radius: 50%;
    position: absolute;
    height: 30px;
    width: 30px;
    border: ${ ({ isActive }) => isActive ? '2px dashed black' : 'none'};
`

const StyledText = styled.p`
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
`


export const PlayerRoundOverview = ({
    playerNumber,
    isActive,
    remainingDisks,
    playerColor
}: PlayerRoundOverviewProps) => {
    return (
        <Wrapper>
            <Row>
                <StyledText>{`Player: ${playerNumber} `}</StyledText>
            </Row>
            <StyledText>{`Turns Left: ${remainingDisks}`}</StyledText>
            <p><Token isActive={isActive} playerColor={playerColor} /></p>
        </Wrapper>
    )
}