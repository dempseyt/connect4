function deepClone<T>(value: T, visitedCache: WeakMap<any, any> = new WeakMap()): T {
  if (!(value instanceof Object) || typeof value === 'function') {
    return value
  }
  if (visitedCache.has(value)) {
    return visitedCache.get(value)
  }

  let result: T

  if (Array.isArray(value)) {
    result = [] as T
  } else {
    result = {} as T
  }
  visitedCache.set(value, result)

  for (const key of Object.keys(value)) {
    const nestedValue = (value as any)[key]
    const clonedValue = deepClone<typeof nestedValue>(nestedValue, visitedCache)
    ;(result as any)[key] = clonedValue
  }

  return result
}

export default deepClone
