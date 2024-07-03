import { Status } from '@/connect-4-domain/game-types'
import styled from 'styled-components'

export type GameStatusProps = {
  gameStatus: Status
}

const Wrapper = styled.div`
  text-align: center;
  background-color: darkblue;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'BigBlueTerminal';
  border-radius: 0 0 15px 15px;
  padding: 10px 0;
`

export const GameStatus = ({ gameStatus }: GameStatusProps) => {
  let gameStatusString = ''
  switch (gameStatus) {
    case Status.IN_PROGRESS:
      gameStatusString = 'Game is in Progress...'
      break
    case Status.PLAYER_ONE_WIN:
      gameStatusString = 'Player 1 Wins!'
      break
    case Status.PLAYER_TWO_WIN:
      gameStatusString = 'Player 2 Wins!'
      break
    case Status.DRAW:
      gameStatusString = "It's a Draw!"
      break
  }

  return (
    <Wrapper>
      <p>{gameStatusString}</p>
    </Wrapper>
  )
}
