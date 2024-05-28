import { describe, expect, it } from 'vitest'
import { createMovePlayerCommand, MovePlayerCommand } from '@/connect-4-domain/commands'

describe('commands', () => {
  describe('createMovePlayerCommand', () => {
    it('should return a createMovePlayerCommand', () => {
      const movePlayerCommand = createMovePlayerCommand({
        player: 1,
        targetCell: { row: 0, column: 0 },
      })
      expect(movePlayerCommand).toBeInstanceOf(MovePlayerCommand)
      expect(movePlayerCommand).toEqual({
        type: 'MOVE_PLAYER',
        payload: {
          player: 1,
          targetCell: { row: 0, column: 0 },
        },
      })
    })
  })
})
