import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import "../css/code.css";

const messages = [
  `def success():\n\n    return "Step 1: Procrastinate. Step 2: Panic. Step 3: Somehow succeed."\n\nprint(success())`,
  `console.log("Some people bring happiness wherever they go. Others, whenever they go.");`,
  `def ignore():\n\n    return "Your opinion has been successfully ignored."\n\nprint(ignore())`,
  `console.log("Some people need a high-five. In the face. With a chair.");`,
  `console.log("I'm not saying you're stupid, but you bring extra oxygen to the planet.");`,
  `def salary():\n\n    return "Comes like a turtle, leaves like a rocket."\n\nprint(salary())`,
  `def breakup():\n\n    return "Ex: ‘You’ll never find someone like me.’ Me: ‘That’s the goal.’"\n\nprint(breakup())`,
  `let life = { sleep: true, code: true, eat: true, repeat: true };\n\n
console.log("Debugging life...")`,
];

const shuffleArray = (array: string[]): string[] => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Code = () => {
  const [shuffledMessages, setShuffledMessages] = useState(messages);

  useEffect(() => {
    setShuffledMessages(shuffleArray(messages));
  }, []);

  return (
    <div className="codeContainer">
      <div className="titleBar">
        <div className="dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="fileName">shallWeCode?</span>
      </div>

      <div className="codeEditor">
        <pre>
          <code>
            {shuffledMessages.length > 0 && (
              <Typewriter
                words={shuffledMessages}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={10}
                delaySpeed={5000}
              />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Code;
