export function saveToStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch {
    // Storage full or unavailable
  }
}

export function loadFromStorage<T>(key: string, def: T): T {
  try {
    const d = localStorage.getItem(key)
    return d ? (JSON.parse(d) as T) : def
  } catch {
    return def
  }
}
