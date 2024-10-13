import { Link } from '@tanstack/react-router';
import { InfoWrapper } from '@/components/InfoWrapper';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { HiOutlineRefresh } from 'react-icons/hi';

export function EndGUI(props: { data: number[] }) {
  return (
    <InfoWrapper>
      <div className="mx-auto my-16 flex max-w-2xl flex-col items-center gap-2 rounded-xl bg-gray-900/40 p-8 text-white outline outline-2 outline-gray-800/40">
        <HiOutlineTrophy className="text-4xl text-yellow-500" />

        <span className="text-6xl font-bold">
          {props.data.reduce((a, b) => a + b, 0)}
        </span>
        <span className="my-2">Total points</span>

        <div className="my-2">
          {props.data.map((x: number, i: number) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="text-xl">
                Round {i + 1}: {x} points
              </div>
            </div>
          ))}
        </div>

        <span className="mt-2 italic text-white/80">Thanks for playing!</span>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Play Again <HiOutlineRefresh />
        </Link>
      </div>
    </InfoWrapper>
  );
}
