import React, { useState } from "react";
import "./DeveloperInfo.css";

const DeveloperInfo = ({
  name = "MD Shirajam Munir",
  imageUrl = "https://avatars.githubusercontent.com/u/583231?v=4",
  github = "https://github.com/muniralways",
  projectLink = "https://github.com/muniralways/React-Paint-app",
  bio = "Frontend / Fullstack Developer. Passionate about React, Canvas & UI design.",
  side = "right"
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button (hide when panel open) */}
      {!open && (
        <button
          className={`dev-toggle-btn ${side}`}
          onClick={() => setOpen(true)}
        >
            Source Code
        </button>
      )}

      {/* Info Panel */}
      <div className={`dev-info-panel ${side} ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </button>

        <img src={imageUrl} alt={name} className="dev-avatar" />
        <h3 className="dev-name">{name}</h3>
        <p className="dev-bio">{bio}</p>

        <div className="dev-links">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn"
          >
            ⭐ Follow on GitHub
          </a>

          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="source-btn"
          >
            📂 View Source Code
          </a>
        </div>
      </div>
    </>
  );
};

export default DeveloperInfo;
