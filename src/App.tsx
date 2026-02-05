import { useState, useEffect } from 'react'
import type { Todo, Filter } from './types/todo'
import { loadTodos, saveTodos } from './utils/storage'
import { TodoInput } from './components/TodoInput/TodoInput'
import { TodoFilter } from './components/TodoFilter/TodoFilter'
import { TodoList } from './components/TodoList/TodoList'
import { TodoFooter } from './components/TodoFooter/TodoFooter'
import styles from './App.module.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length
  const hasCompleted = todos.some((t) => t.completed)

  function addTodo(text: string) {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
    ])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function editTodo(id: string, text: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    )
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>
      <div className={styles.card}>
        <TodoInput onAdd={addTodo} />
        <TodoFilter current={filter} onChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {todos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  )
}

export default App
