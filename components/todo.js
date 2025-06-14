// export default function Todo({ todo }) {
//     return (
//         <li>
//             <span>{todo.name}</span>
//             {todo.completed ? " ✅" : ""}
//         </li>
//     )
// }

// import styles from '../styles/layout.module.css'

// export default function Todo({ todo, onDelete, onChange }) {
//     return (
//         <li className={styles.todoItem}>
//             <input
//                 type="checkbox"
//                 name="completed"
//                 checked={todo.completed}
//                 onChange={e => onChange(e, todo.id)}
//             />
//             <span
//                 className={todo.completed ? styles.completedText : ''}
//                 style={{
//                     flex: 1,
//                     marginLeft: '0.5rem',
//                     textDecoration: todo.completed ? 'line-through' : 'none',
//                     color: todo.completed ? '#aaa' : '#222'
//                 }}
//             >
//                 {todo.name}
//             </span>
//             <button
//                 className={styles.deleteBtn}
//                 style={{
//                     marginLeft: 'auto',
//                     background: 'none',
//                     color: '#ff4d4f',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: '1.2rem'
//                 }}
//                 title="Eliminar"
//                 onClick={() => onDelete(todo.id)}
//             >
//                 ×
//             </button>
//         </li>
//     )
// }

import styles from '../styles/layout.module.css'
import { useState } from 'react'

export default function Todo({ todo, onDelete, onChange }) {
    const [poem, setPoem] = useState(null)
    const [isPoemVisible, setIsPoemVisible] = useState(false)

    async function generatePoem(id) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/write-poem/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            setPoem(data.poem);
            setIsPoemVisible(true);
        }
    }

    function closePoemBox() {
        setIsPoemVisible(false);
    }

    return (
        <li className={styles.todoItem} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <input
                type="checkbox"
                name="completed"
                checked={todo.completed}
                onChange={e => onChange(e, todo.id)}
                style={{ marginRight: '0.7rem' }}
            />
            <span
                className={todo.completed ? styles.completedText : ''}
                style={{
                    flex: 1,
                    minWidth: 0,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#aaa' : '#222'
                }}
            >
                {todo.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                <button
                    className={styles.generatePoemBtn}
                    onClick={() => generatePoem(todo.id)}
                    title="Generar poema"
                >
                    Generar Poema
                </button>
                <button
                    className={styles.deleteBtn}
                    style={{
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
            </div>
            {isPoemVisible && (
                <div className={styles.poemBox}>
                    <button
                        className={styles.closeButton}
                        onClick={closePoemBox}
                        title="Cerrar"
                    >
                        ×
                    </button>
                    <div className={styles.poem}>
                        <p>{poem}</p>
                    </div>
                </div>
            )}
        </li>
    )
}