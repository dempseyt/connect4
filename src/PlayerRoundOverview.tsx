import styled from "styled-components"

export type PlayerRoundOverviewProps = {
    playerNumber: 1 | 2,
    isActive: boolean,
    remainingDisks?: number,
    playerColor: string
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: blue;
    color: white;
    padding: 15px 20px;
    width: 100%;
    font-family: monospace;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 2.4rem
`
const Token = styled.div<{ isActive: boolean, playerColor: string }>`
    background-color: ${ (props) => props.isActive ? props.playerColor : "initial"};
    border-radius: 50%;
    height: 25px;
    width: 25px;
    border: ${ ({ isActive }) => isActive ? '2px dashed white' : 'none'};
`

const StyledText = styled.p`
    margin: 0;
    font-size: 1.2rem;
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
                <StyledText>{`Player : ${playerNumber}`}</StyledText>
                <p><Token isActive={isActive} playerColor={playerColor} /></p>
            </Row>
            <StyledText>{`Remaining Disks: ${remainingDisks}`}</StyledText>
        </Wrapper>
    )
}