import { Link } from '@tanstack/react-router';
export function EndGUI(props: { data: number[] }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {props.data.map((x: number, i: number) => (
        <div key={i} className="flex flex-col items-center justify-center">
          <div className="text-xl font-semibold">
            Round {i + 1}: {x} points
          </div>
        </div>
      ))}
      Total Score: {props.data.reduce((a, b) => a + b, 0)}
      <Link to="/" className="rounded-lg bg-blue-600 p-2 text-white">
        Play Again
      </Link>
    </div>
  );
}
