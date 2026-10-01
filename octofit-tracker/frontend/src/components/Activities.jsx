import { useEffect, useState } from 'react'
import { displayDate, fetchCollection } from '../api'
import { ResourceState } from './ResourceState'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('/api/activities/', controller.signal).then(setActivities).catch((error) => {
      if (error.name !== 'AbortError') setStatus({ loading: false, error: error.message })
    }).finally(() => setStatus((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1></div><span className="count-badge">{activities.length} logged</span></div><ResourceState {...status} emptyMessage="No activities have been logged yet."><div className="table-shell"><table><thead><tr><th>Member</th><th>Activity</th><th>Points</th><th>Recorded</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || `${activity.username}-${activity.recordedAt}`}><td>{activity.username || 'Unknown member'}</td><td>{activity.type || activity.name || 'Workout'}</td><td className="points">{activity.points ?? 0}</td><td>{displayDate(activity.recordedAt || activity.createdAt)}</td></tr>)}</tbody></table></div></ResourceState></section>
}

export default Activities