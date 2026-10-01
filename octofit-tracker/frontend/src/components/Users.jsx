import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { ResourceState } from './ResourceState'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection('users', controller.signal).then(setUsers).catch((error) => { if (error.name !== 'AbortError') setStatus({ loading: false, error: error.message }) }).finally(() => setStatus((current) => ({ ...current, loading: false }))); return () => controller.abort() }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Members</h1></div><span className="count-badge">{users.length} members</span></div><ResourceState {...status} emptyMessage="No members have joined yet."><div className="card-grid">{users.map((user, index) => <article className="data-card member-card" key={user._id || user.username || index}><div className="avatar">{(user.username || user.name || '?').slice(0, 1).toUpperCase()}</div><h2>{user.username || user.name || 'Unknown member'}</h2><p>{user.email || 'OctoFit member'}</p><span className="card-meta">{user.team || 'Unassigned'}</span></article>)}</div></ResourceState></section>
}

export default Users