type TargetCell = {
  row: number
  column: number
}

export enum CommandTypes {
  MOVE_PLAYER = 'MOVE_PLAYER',
}

export type MovePlayerCommandPayload = {
  player: 1 | 2
  targetCell: TargetCell
}

export class MovePlayerCommand {
  type: CommandTypes.MOVE_PLAYER
  payload: MovePlayerCommandPayload

  constructor(commandPayload: MovePlayerCommandPayload) {
    this.type = CommandTypes.MOVE_PLAYER
    this.payload = commandPayload
  }
}

const createMovePlayerCommand = (commandPayload: MovePlayerCommandPayload): MovePlayerCommand => {
  return new MovePlayerCommand(commandPayload)
}

export { createMovePlayerCommand }
