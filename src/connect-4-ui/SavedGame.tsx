import { GameUuid } from '@/connect-4-domain/game-types'
import styled from 'styled-components'

type SavedGameProps = {
  gameId: GameUuid
  dateSaved: string
  handleLoadClick?: () => void
  handleDeleteClick?: () => void
}

const StyledSavedGame = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid darkblue;
  background-color: aliceblue;
  border-radius: 20px;
  font-family: 'BigBlueTerminal';
  padding: 10px 20px;
`

const StyledSavedDetails = styled.div``
const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`

const StyledLoadButton = styled.button`
  background-color: lightgreen;
  color: white;
  padding: 0.6rem 1rem;
  border: 2px solid white;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`
const StyledDeleteButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.6rem 1rem;
  border: 2px solid white;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`
export const SavedGame = ({
  gameId,
  dateSaved,
  handleLoadClick = () => {},
  handleDeleteClick = () => {},
}: SavedGameProps) => {
  return (
    <StyledSavedGame>
      <StyledSavedDetails>
        <h3>Game ID: {gameId}</h3>
        <p>Saved: {dateSaved}</p>
      </StyledSavedDetails>
      <StyledButtons>
        <StyledLoadButton onClick={handleLoadClick}>Load</StyledLoadButton>
        <StyledDeleteButton onClick={handleDeleteClick}>Delete</StyledDeleteButton>
      </StyledButtons>
    </StyledSavedGame>
  )
}
