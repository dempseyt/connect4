import styled from "styled-components";
import { PlayerRoundOverviewProps } from "./PlayerRoundOverview";
import { PlayerRoundOverview } from "./PlayerRoundOverview";

export type PlayerRoundOverviewsProps = {
    activePlayer: 1 | 2,
    playerOne: PlayerRoundOverviewProps,
    playerTwo: PlayerRoundOverviewProps
}

const PlayerRoundOverviews = ({ activePlayer, playerOne, playerTwo }: PlayerRoundOverviewsProps) => {
    const StyledOverview = styled.div`
        display: flex;
        width: 100%;
    `

    return (
        <StyledOverview>
            <PlayerRoundOverview 
                playerNumber={playerOne.playerNumber} 
                isActive={activePlayer === 1} 
                remainingDisks={playerOne.remainingDisks} 
                playerColor={playerOne.playerColor}>
            </PlayerRoundOverview>
            <PlayerRoundOverview 
                playerNumber={playerTwo.playerNumber}
                isActive={activePlayer === 2}
                remainingDisks={playerTwo.remainingDisks}
                playerColor={playerTwo.playerColor}>
            </PlayerRoundOverview>
        </StyledOverview>
    )
} 

export default PlayerRoundOverviews;