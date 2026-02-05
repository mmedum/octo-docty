import styles from './TodoFooter.module.css'

interface TodoFooterProps {
  activeCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

export function TodoFooter({ activeCount, hasCompleted, onClearCompleted }: TodoFooterProps) {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      {hasCompleted && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  )
}
