import styled from "styled-components"

export type RoundProps = {
    roundNumber: number, 
}

const StyledRoundBanner = styled.div`
    background-color: blue;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem 0;
    font-weight: 700;
    border-radius: 15px 15px 0 0;
`

export const Round = ( { roundNumber }: RoundProps ) => 
    <StyledRoundBanner>
        {`Round ${roundNumber}`}
    </StyledRoundBanner>

Round.defaultProps = {
    roundNumber: 1
}