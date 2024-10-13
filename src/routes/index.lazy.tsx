import { InfoWrapper } from '@/components/InfoWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <InfoWrapper>
      <div className="mx-auto my-8 max-w-2xl rounded-xl bg-gray-900/40 p-4 text-white outline outline-2 outline-gray-800/70 backdrop-blur">
        <h1 className="text-4xl font-semibold">GMU Guesser</h1>
        <p className="my-2 text-xl text-gray-200">
          You're placed in a randomly photographed place on the Mason campus and
          are given a map. Find out where you are from what you know about the
          Mason campus, and earn points!
        </p>
        <Link
          to="/game"
          className="rounded bg-green-500 p-2 outline outline-1 outline-green-500"
        >
          Get started 🚀
        </Link>
      </div>
    </InfoWrapper>
  );
}
