import { Status } from '@/connect-4-domain/game-types'
import { GameStatus } from '@/connect-4-ui/GameStatus'
import { PlayerRoundOverviewProps } from '@/connect-4-ui/PlayerRoundOverview'
import { PlayerRoundOverviews } from '@/connect-4-ui/PlayerRoundOverviews'
import { Round } from '@/connect-4-ui/Round'
import styled from 'styled-components'

export type GameOverviewProps = {
  activePlayer: 1 | 2
  playerOne: PlayerRoundOverviewProps
  playerTwo: PlayerRoundOverviewProps
  roundNumber: number
  gameStatus: Status
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid lightblue;
  border-radius: 20px;
`

export const GameOverview = ({
  activePlayer,
  playerOne,
  playerTwo,
  roundNumber,
  gameStatus,
}: GameOverviewProps) => {
  return (
    <Wrapper>
      <Round roundNumber={roundNumber} />
      <PlayerRoundOverviews
        activePlayer={activePlayer}
        playerOne={playerOne}
        playerTwo={playerTwo}
      />
      <GameStatus gameStatus={gameStatus} />
    </Wrapper>
  )
}
