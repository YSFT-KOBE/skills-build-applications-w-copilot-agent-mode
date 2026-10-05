import { useEffect, useState } from 'react'
import { buildApiEndpoint, fetchCollection } from '../api'
import { ResourceState } from './ResourceState'

const leaderboardEndpoint = buildApiEndpoint(
  '-8000.app.github.dev/api/leaderboard/',
  '/api/leaderboard/',
)

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(leaderboardEndpoint, controller.signal).then(setLeaders).catch((error) => {
      if (error.name !== 'AbortError') setStatus({ loading: false, error: error.message })
    }).finally(() => setStatus((current) => ({ ...current, loading: false })))
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Team pulse</p><h1>Leaderboard</h1></div><span className="count-badge">Top performers</span></div><ResourceState {...status} emptyMessage="The leaderboard will appear after the first activity."><div className="leaderboard-list">{leaders.map((leader, index) => <article className={`leader-row ${index === 0 ? 'leader-row-featured' : ''}`} key={leader._id || leader.username || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><div className="leader-info"><strong>{leader.username || leader.name || 'Unknown member'}</strong><span>{leader.activities ?? 0} activities</span></div><strong className="leader-points">{leader.points ?? 0}<small> pts</small></strong></article>)}</div></ResourceState></section>
}

export default Leaderboard