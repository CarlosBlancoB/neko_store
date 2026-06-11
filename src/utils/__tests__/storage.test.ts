import { beforeEach, describe, expect, it } from 'vitest'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

beforeEach(() => {
  localStorage.clear()
})

describe('saveToStorage', () => {
  it('saves JSON value to localStorage', () => {
    saveToStorage('test-key', { a: 1 })
    expect(localStorage.getItem('test-key')).toBe('{"a":1}')
  })

  it('handles primitive values', () => {
    saveToStorage('num', 42)
    expect(localStorage.getItem('num')).toBe('42')
  })
})

describe('loadFromStorage', () => {
  it('loads existing value', () => {
    localStorage.setItem('name', '"Neko"')
    expect(loadFromStorage('name', 'default')).toBe('Neko')
  })

  it('returns default for missing key', () => {
    expect(loadFromStorage('missing', 0)).toBe(0)
  })

  it('returns default on parse error', () => {
    localStorage.setItem('bad', '{broken')
    expect(loadFromStorage('bad', [])).toEqual([])
  })
})
