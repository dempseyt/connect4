import React from 'react'
import styled from 'styled-components'
import { SavedGame } from './SavedGame'

type LoadGameDialogProps = {
  handleCloseClick?: () => void
  children?: Array<React.ReactElement<typeof SavedGame>> | React.ReactElement<typeof SavedGame>
}

const StyledLoadGameDialog = styled.div`
  border: 2px solid darkblue;
  border-radius: 20px;
  background-color: lightblue;
  max-height: 80vh;
  overflow-y: auto;
`

const StyledHeading = styled.h1`
  text-align: center;
  font-family: 'BigBlueTerminal';
  font-weight: 700;
  color: darkblue;
  text-decoration: underline dashed;
  margin: 0;
  padding: 10px 0 0 10px;
`

const StyledSavedGames = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  padding: 2rem;
  gap: 5px;
`

const StyledCloseButton = styled.button`
  font-family: 'BigBlueTerminal';
  font-size: 1rem;
  padding: 5px 10px;
  color: darkblue;
  background-color: inherit;
  border: none;
  border-radius: 100px;

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    cursor: pointer;
    color: blue;
    font-size: 1.3rem;
    transition: all 0.3s;
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
`

const StyledMsg = styled.p`
  font-family: 'BigBlueTerminal';
  text-align: center;
  color: blue;
`

export const LoadGameDialog = ({ handleCloseClick = () => {}, children }: LoadGameDialogProps) => {
  return (
    <StyledLoadGameDialog>
      <StyledHeader>
        <StyledHeading>Saved Games</StyledHeading>
        <StyledCloseButton onClick={handleCloseClick}>X</StyledCloseButton>
      </StyledHeader>
      <StyledSavedGames>
        {React.Children.count(children) === 0 ? (
          <StyledMsg>Currently No Saved Games...</StyledMsg>
        ) : (
          children
        )}
      </StyledSavedGames>
    </StyledLoadGameDialog>
  )
}
