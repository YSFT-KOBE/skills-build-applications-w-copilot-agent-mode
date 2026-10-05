import { useEffect, useState } from 'react'
import { buildApiEndpoint, fetchCollection } from '../api'
import { ResourceState } from './ResourceState'

const workoutsEndpoint = buildApiEndpoint(
  '-8000.app.github.dev/api/workouts/',
  '/api/workouts/',
)

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection(workoutsEndpoint, controller.signal).then(setWorkouts).catch((error) => { if (error.name !== 'AbortError') setStatus({ loading: false, error: error.message }) }).finally(() => setStatus((current) => ({ ...current, loading: false }))); return () => controller.abort() }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Make today count</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} workouts</span></div><ResourceState {...status} emptyMessage="No workouts have been added yet."><div className="card-grid">{workouts.map((workout, index) => <article className="data-card workout-card" key={workout._id || workout.name || index}><span className="card-index">{String(index + 1).padStart(2, '0')}</span><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for your next win.'}</p><div className="workout-details"><span>{workout.duration ? `${workout.duration} min` : 'Flexible duration'}</span><span>{workout.level || 'All levels'}</span></div></article>)}</div></ResourceState></section>
}

export default Workouts