// export default function Todo({ todo }) {
//     return (
//         <li>
//             <span>{todo.name}</span>
//             {todo.completed ? " ✅" : ""}
//         </li>
//     )
// }

import styles from '../styles/layout.module.css'

export default function Todo({ todo, onDelete, onChange }) {
    return (
        <li className={styles.todoItem}>
            <input
                type="checkbox"
                name="completed"
                checked={todo.completed}
                onChange={e => onChange(e, todo.id)}
            />
            <span
                className={todo.completed ? styles.completedText : ''}
                style={{
                    flex: 1,
                    marginLeft: '0.5rem',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#aaa' : '#222'
                }}
            >
                {todo.name}
            </span>
            <button
                className={styles.deleteBtn}
                style={{
                    marginLeft: 'auto',
                    background: 'none',
                    color: '#ff4d4f',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                }}
                title="Eliminar"
                onClick={() => onDelete(todo.id)}
            >
                ×
            </button>
        </li>
    )
}