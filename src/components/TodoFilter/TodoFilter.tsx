import type { Filter } from '../../types/todo'
import styles from './TodoFilter.module.css'

interface TodoFilterProps {
  current: Filter
  onChange: (filter: Filter) => void
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function TodoFilter({ current, onChange }: TodoFilterProps) {
  return (
    <div className={styles.tabs}>
      {filters.map((f) => (
        <button
          key={f.value}
          className={`${styles.tab} ${current === f.value ? styles.active : ''}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
