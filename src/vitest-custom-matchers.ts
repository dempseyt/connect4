import { expect } from 'vitest'
import toBeUuid from '@/connect-4-ui/toBeUuid'
import toBeDeeplyUnequal from './connect-4-domain/to-be-deeply-unequal'

expect.extend({
  toBeUuid,
  toBeDeeplyUnequal,
})
