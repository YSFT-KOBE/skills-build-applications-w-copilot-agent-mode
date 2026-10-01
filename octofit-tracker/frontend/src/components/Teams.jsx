import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import { ResourceState } from './ResourceState'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection('teams', controller.signal).then(setTeams).catch((error) => { if (error.name !== 'AbortError') setStatus({ loading: false, error: error.message }) }).finally(() => setStatus((current) => ({ ...current, loading: false }))); return () => controller.abort() }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Find your crew</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div><ResourceState {...status} emptyMessage="No teams have been created yet."><div className="card-grid">{teams.map((team, index) => <article className="data-card" key={team._id || team.name || index}><span className="card-index">0{index + 1}</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A team ready to move together.'}</p><span className="card-meta">{team.members?.length ?? team.memberCount ?? 0} members</span></article>)}</div></ResourceState></section>
}

export default Teams