import { PlayerMove } from '@/connect-4-domain/game-types'

export type MovePlayerCommandPayload = PlayerMove

export enum CommandTypes {
  MOVE_PLAYER = 'MOVE_PLAYER',
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
