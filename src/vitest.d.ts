import { Assertion, AsymmetricMatchersContaining } from 'vitest'

interface CustomMatchers<R = unknown> {
    toBeUuid: () => R
}
declare module 'vitest' {
    interface Assertion<T = any> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export type MatcherResult = {
    pass: boolean,
    message: () => string,
    actual?: unknown,
    expected?:unknown
}

