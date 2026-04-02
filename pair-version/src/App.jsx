import { useMemo, useState } from 'react'
import './App.css'

const FILTERS = ['All', 'Active', 'Completed']

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('All')

  const visibleTasks = useMemo(() => {
    if (filter === 'Active') {
      return tasks.filter((task) => !task.completed)
    }

    if (filter === 'Completed') {
      return tasks.filter((task) => task.completed)
    }

    return tasks
  }, [filter, tasks])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title: trimmedTitle, completed: false },
    ])
    setTitle('')
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="task-manager" aria-labelledby="task-manager-title">
        <div className="header">
          <p className="eyebrow">Task Manager</p>
          <h1 id="task-manager-title">Keep work simple</h1>
          <p className="subtitle">Add tasks, mark them complete, and filter the list.</p>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a task title"
          />
          <button type="submit">Add task</button>
        </form>

        <div className="filters" role="tablist" aria-label="Task filters">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className={option === filter ? 'filter active' : 'filter'}
              onClick={() => setFilter(option)}
              aria-pressed={option === filter}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="summary">
          {tasks.length} task{tasks.length === 1 ? '' : 's'} total
        </p>

        <ul className="task-list">
          {visibleTasks.length === 0 ? (
            <li className="empty-state">No tasks match this filter.</li>
          ) : (
            visibleTasks.map((task) => (
              <li key={task.id} className={task.completed ? 'task completed' : 'task'}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  )
}

export default App
