import type { Todo } from '../types/todo'

const STORAGE_KEY = 'octo-docty-todos'

export function loadTodos(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as Todo[]
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // silently fail if localStorage is unavailable
  }
}
