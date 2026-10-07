import "../css/matrix.css";

const COLUMN_COUNT = 50;
const DIGITS_PER_COLUMN = 28;

const MIN_SPEED = 10;
const MAX_SPEED = 13;

const columns = Array.from({ length: COLUMN_COUNT }, (_, i) => i);

export default function MatrixBackground() {
  return (
    <div className="matrix">
      {columns.map((column) => (
        <div
          className="matrix-column"
          key={column}
          style={{
            // Horizontal position of each column
            left: `${column * (100 / COLUMN_COUNT)}%`,

            // Random starting position
            animationDelay: `${-(Math.random() * 10)}s`,

            // Random falling speed
            animationDuration: `${
              MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
            }s`,
          }}
        >
          {Array.from({ length: DIGITS_PER_COLUMN }, (_, i) => (
            <span key={i}>
              {/* Randomly choose 0 or 1 */}
              {Math.random() > 0.5 ? "0" : "1"}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}