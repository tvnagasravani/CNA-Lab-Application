import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-title gradient-text">RVCE Todo</h2>
        <p className="loading-subtitle">Preparing your workspace…</p>
      </div>
    </div>
  );
}
