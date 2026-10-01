import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [['/', 'Overview'], ['/api/activities/', 'Activities'], ['/api/leaderboard/', 'Leaderboard'], ['/api/teams/', 'Teams'], ['/api/users/', 'Members'], ['/api/workouts/', 'Workouts']]

function Overview() {
  return <section className="overview"><p className="eyebrow">Daily brief</p><h1>Small steps.<br /><em>Strong momentum.</em></h1><p className="intro">Track the movement that matters, find your people, and keep your next win in sight.</p><div className="overview-rule" /><p className="overview-note">Choose a section to explore your OctoFit community.</p></section>
}

function App() {
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><span className="brand-mark">O</span><span>OctoFit<span className="brand-muted"> / tracker</span></span></div><nav aria-label="Primary navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><span className="nav-dot" />{label}</NavLink>)}</nav><div className="sidebar-footer"><span className="status-dot" />API connected through Codespaces</div></aside><main className="main-content"><Routes><Route path="/" element={<Overview />} /><Route path="/api/activities/" element={<Activities />} /><Route path="/api/leaderboard/" element={<Leaderboard />} /><Route path="/api/teams/" element={<Teams />} /><Route path="/api/users/" element={<Users />} /><Route path="/api/workouts/" element={<Workouts />} /></Routes></main></div>
}

export default App