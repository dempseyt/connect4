import styled from "styled-components"

export type BoardCellProps = {
    player?: 1 | 2,
    id?: string,
    className?: string 
}

const StyledBoardCell = styled.div`
    width: 60px;
    height: 60px;
    background: blue;
    position: relative;

`

const StyledBoardCellDisc = styled.div<{ player?: 1 | 2 }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 5px;
    background: ${({player}) => {
        switch (player){
            case 1:
                return "red";
            case 2: 
                return "yellow";
            default: 
                return "white";
        }
    }};
`

export const BoardCell = ( { player, className }: BoardCellProps ) => 
    <StyledBoardCell className={className}>
        <StyledBoardCellDisc player={player} />
    </StyledBoardCell>