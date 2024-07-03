import { GameUuid } from '@/connect-4-domain/game-types'
import styled from 'styled-components'

type SavedGameProps = {
  gameId: GameUuid
  dateSaved: string
}

const StyledSavedGame = styled.div`
  border: 2px solid lightblue;
  font-family: 'BigBlueTerminal';
  padding-left: 20px;
`

export const SavedGame = ({ gameId, dateSaved }: SavedGameProps) => {
  return (
    <StyledSavedGame>
      <h3>Game ID: {gameId}</h3>
      <p>Saved: {dateSaved}</p>
    </StyledSavedGame>
  )
}
