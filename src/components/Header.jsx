function Header({ backendStatus }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">🚦</div>
          <div>
            <h1 className="header-title">Urban Traffic Intelligence</h1>
            <p className="header-subtitle">AI-Powered Traffic Monitoring & Decision Support</p>
          </div>
        </div>
        <div className="header-right">
          <span className={`header-status ${backendStatus === 'connected' ? '' : 'offline'}`}>
            <span className="status-dot"></span>
            {backendStatus === 'connected' ? 'Live — ML Backend' : 'Offline — Mock Data'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
