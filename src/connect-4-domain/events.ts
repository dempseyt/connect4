export enum EventTypes {
  PLAYER_MOVE_FAILED = 'PLAYER_MOVE_FAILED',
  PLAYER_MOVED = 'PLAYER_MOVED',
}

type PlayerMoveFailedEventPayload = {
  message: string
}
type PlayerMovedEventPayload = {
  player: 1 | 2
  targetCell: {
    row: number
    column: number
  }
}

export class PlayerMoveFailedEvent {
  type: EventTypes.PLAYER_MOVE_FAILED
  payload: PlayerMoveFailedEventPayload

  constructor(eventPayload: PlayerMoveFailedEventPayload) {
    this.type = EventTypes.PLAYER_MOVE_FAILED
    this.payload = eventPayload
  }
}

export class PlayerMovedEvent {
  type: EventTypes.PLAYER_MOVED
  payload: PlayerMovedEventPayload

  constructor(eventPayload: PlayerMovedEventPayload) {
    this.type = EventTypes.PLAYER_MOVED
    this.payload = eventPayload
  }
}

export const createPlayerMoveFailedEvent = (
  eventPayload: PlayerMoveFailedEventPayload,
): PlayerMoveFailedEvent => new PlayerMoveFailedEvent(eventPayload)

export const createPlayerMovedEvent = (eventPayload: PlayerMovedEventPayload): PlayerMovedEvent =>
  new PlayerMovedEvent(eventPayload)
