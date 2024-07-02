import styled from 'styled-components'

export type RoundProps = {
  roundNumber: number
}

const StyledRoundBanner = styled.div`
  background-color: darkblue;
  color: white;
  font-size: 1rem;
  text-align: center;
  font-family: 'BigBlueTerminal';
  font-weight: 700;
  padding-top: 10px;
  border-radius: 15px 15px 0 0;
`

export const Round = ({ roundNumber = 1 }: RoundProps) => (
  <StyledRoundBanner>{`Round ${roundNumber}`}</StyledRoundBanner>
)
