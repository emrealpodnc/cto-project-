import "./ProgressBar.css";

function ProgressBar({ progress }) {

  let color = "#e53935";

if (progress > 30 && progress <= 70) {
  color = "#fb8c00";
} else if (progress > 70 && progress < 100) {
  color = "#9ccf9e";
} else if (progress === 100) {
  color = "#1c9b06";
}

  return (
    <div className="progress-container">
      <div
        className="progress-fill"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      ></div>

      <span className="progress-text">
        {progress}%
      </span>
    </div>
  );
}

export default ProgressBar;