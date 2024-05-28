function deepClone<T>(value: T): T {
  if (!(value instanceof Object) || typeof value === 'function') {
    return value
  }

  let result: T

  if (Array.isArray(value)) {
    result = [] as T
  } else {
    result = {} as T
  }

  for (const key of Object.keys(value)) {
    ;(result as any)[key] = deepClone((value as any)[key])
  }

  return result
}

export default deepClone
