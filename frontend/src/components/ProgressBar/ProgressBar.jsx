import "./ProgressBar.css";

function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      ></div>

      <span className="progress-text">
        {progress}%
      </span>
    </div>
  );
}

export default ProgressBar;