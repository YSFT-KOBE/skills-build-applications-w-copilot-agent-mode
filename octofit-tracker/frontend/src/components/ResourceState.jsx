export function ResourceState({ loading, error, emptyMessage, children }) {
  if (loading) return <p className="state-message">Loading your OctoFit data...</p>
  if (error) return <p className="state-message state-message-error">{error}</p>
  if (!children) return <p className="state-message">{emptyMessage}</p>
  return children
}