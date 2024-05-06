import styled from "styled-components";
import { PlayerRoundOverviewProps } from "@/connect-4-ui/PlayerRoundOverview";
import { PlayerRoundOverview } from "@/connect-4-ui/PlayerRoundOverview";

export type PlayerRoundOverviewsProps = {
    activePlayer: 1 | 2,
    playerOne: PlayerRoundOverviewProps,
    playerTwo: PlayerRoundOverviewProps
}

const StyledOverview = styled.div`
    display: flex;
    background-color: blue;
    width: 100%;
`
export const PlayerRoundOverviews = ({ activePlayer, playerOne, playerTwo }: PlayerRoundOverviewsProps) => {
    return (
        <StyledOverview>
            <PlayerRoundOverview {...playerOne} isActive={activePlayer === 1}/>
            <PlayerRoundOverview {...playerTwo} isActive={activePlayer === 2} />
        </StyledOverview>
    )
} 

export default PlayerRoundOverviews;