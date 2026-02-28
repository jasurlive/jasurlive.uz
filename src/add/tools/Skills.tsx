import "../css/home.css";

const skillsData = [
  [
    {
      name: "Creo 9.0",
      logo: "https://img.shields.io/badge/-Creo%209.0-00549A?logo=ptc&logoColor=white&style=flat",
    },
    {
      name: "AutoCAD",
      logo: "https://img.shields.io/badge/-AutoCAD-CF2922?logo=autodesk&logoColor=white&style=flat",
    },
    {
      name: "Blender",
      logo: "https://img.shields.io/badge/-Blender-F5792A?logo=blender&logoColor=white&style=flat",
    },
    {
      name: "RobotStudio",
      logo: "https://img.shields.io/badge/-RobotStudio-005EB8?logo=abbrobotics&logoColor=white&style=flat",
    },
    {
      name: "Microsoft 365",
      logo: "https://img.shields.io/badge/-Microsoft%20365-D83B01?logo=microsoft&logoColor=white&style=flat",
    },
    {
      name: "Arduino",
      logo: "https://img.shields.io/badge/-Arduino-00979D?logo=arduino&logoColor=white&style=flat",
    },

    {
      name: "MATLAB",
      logo: "https://img.shields.io/badge/-MATLAB-0076A8?logo=mathworks&logoColor=white&style=flat",
    },
    {
      name: "VS Code",
      logo: "https://img.shields.io/badge/-VS%20Code-007ACC?logo=visualstudiocode&logoColor=white&style=flat",
    },
    {
      name: "Photoshop",
      logo: "https://img.shields.io/badge/-Photoshop-31A8FF?logo=adobephotoshop&logoColor=white&style=flat",
    },
    {
      name: "Filmora",
      logo: "https://img.shields.io/badge/-Filmora-FF2C63?logo=wondershare&logoColor=white&style=flat",
    },
    {
      name: "Premiere Pro",
      logo: "https://img.shields.io/badge/-Premiere%20Pro-9999FF?logo=adobepremierepro&logoColor=white&style=flat",
    },
    {
      name: "Audacity",
      logo: "https://img.shields.io/badge/-Audacity-0000CC?logo=audacity&logoColor=white&style=flat",
    },

    {
      name: "Python",
      logo: "https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white&style=flat",
    },
    {
      name: "JavaScript",
      logo: "https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat",
    },
    {
      name: "HTML5",
      logo: "https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat",
    },
    {
      name: "CSS3",
      logo: "https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=flat",
    },
    {
      name: "PHP",
      logo: "https://img.shields.io/badge/-PHP-777BB4?logo=php&logoColor=white&style=flat",
    },
    {
      name: "C#",
      logo: "https://img.shields.io/badge/-C%23-9b4dca?logo=dotnet&logoColor=white&style=flat",
    },

    {
      name: "React",
      logo: "https://img.shields.io/badge/-React%20JS-61DAFB?logo=react&logoColor=black&style=flat",
    },
    {
      name: "Node.js",
      logo: "https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white&style=flat",
    },
    {
      name: "Firebase",
      logo: "https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black&style=flat",
    },
    {
      name: "MySQL",
      logo: "https://img.shields.io/badge/-MySQL-4479A1?logo=mysql&logoColor=white&style=flat",
    },
    {
      name: "Jupyter",
      logo: "https://img.shields.io/badge/-Jupyter-F37626?logo=jupyter&logoColor=white&style=flat",
    },
    {
      name: "Pandas",
      logo: "https://img.shields.io/badge/-Pandas-150458?logo=pandas&logoColor=white&style=flat",
    },

    {
      name: "Git",
      logo: "https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=flat",
    },
    {
      name: "GitHub",
      logo: "https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&style=flat",
    },
    {
      name: "Vercel",
      logo: "https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white&style=flat",
    },
    {
      name: "Netlify",
      logo: "https://img.shields.io/badge/-Netlify-00C7B7?logo=netlify&logoColor=white&style=flat",
    },
    {
      name: "Vite",
      logo: "https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat",
    },
    {
      name: "TypeScript",
      logo: "https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat",
    },
    {
      name: "React TypeScript",
      logo: "https://img.shields.io/badge/-React%20TS-61DAFB?logo=react&logoColor=black&style=flat",
    },
    {
      name: "Django",
      logo: "https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white&style=flat",
    },
    {
      name: "Vue",
      logo: "https://img.shields.io/badge/-Vue-4FC08D?logo=vue.js&logoColor=white&style=flat",
    },
    {
      name: "More coming...",
      logo: "https://img.shields.io/badge/-More%20coming...-E0E0E0?logo=hourglass&logoColor=black&style=flat",
    },
  ],
];

function Skills() {
  return (
    <div className="container-skills-fix">
      <h1>Software/Languages/Tools/Libraries I use:</h1>
      <div className="container-skills">
        {skillsData.flat().map((skill, index) => (
          <div key={index} className="logo-skills-container">
            <img src={skill.logo} alt={skill.name} className="logo-skills" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
