import "../css/home.css";

const webProjectsData = [
  {
    name: "CD IELTS Preparation",
    url: "https://ieltslive.vercel.app/",
    icon: "💻",
    description: "CD IELTS Prep (IELTSLive) 🆕",
  },
  {
    name: "Music Playlist (DJ)",
    url: "https://playlistgo.vercel.app/",
    icon: "🎧",
    description: "DJ YouTube (PlaylistGo) 🆕",
  },
  {
    name: "Travel Map",
    url: "https://destinero.vercel.app/",
    icon: "🗺️",
    description: "Travel Map (Destinero) 🆕",
  },

  {
    name: "uzChess.vercel.app",
    url: "https://uzchess.vercel.app",
    icon: "♟️",
    description: "Play Chess (uzChess) 🆕",
  },
  {
    name: "Get a Hangul Certificate",
    url: "https://jasurlive.github.io/Hangul/",
    icon: "📄",
    description: "Get a Hangul Certificate",
  },
  {
    name: "To-Do List",
    url: "https://checklistgo.vercel.app/",
    icon: "✅",
    description: "To-Do List (ChecklistGo) 🆕",
  },
  {
    name: "Latin-Cyrillic Converter (uzConvert)",
    url: "https://uzconvert.vercel.app",
    icon: "🔁",
    description: "Latin-Cyrillic Converter",
  },
  {
    name: "Make Framed Pictures",
    url: "https://jasurlive.github.io/photo-frame/",
    icon: "🖼️",
    description: "Make Framed Pictures",
  },
];

function Projects() {
  return (
    <div className="container-web-projects">
      <h1>Web Projects:</h1>
      {webProjectsData.map((project, index) => (
        <a href={project.url} className="web-project-link" key={index}>
          <div className="iconz">{project.icon} </div> {project.description}
        </a>
      ))}
    </div>
  );
}

export default Projects;
