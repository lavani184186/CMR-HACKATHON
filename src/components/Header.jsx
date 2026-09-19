function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">🚦</div>
          <div>
            <h1 className="header-title">TrafficSetu – Predict. Prevent. Redirect</h1>
            <p className="header-subtitle">AI-Powered Traffic Monitoring & Decision Support</p>
          </div>
        </div>
        <div className="header-right">
          <span className="header-status">
            <span className="status-dot"></span>
            Live Environment
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
