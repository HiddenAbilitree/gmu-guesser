import { InfoWrapper } from '@/components/InfoWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <InfoWrapper>
      <div className="max-w-2xl p-4 my-8 mx-auto bg-gray-900/40 backdrop-blur outline-gray-800/70 outline outline-2 rounded-xl text-white">
        <h1 className="text-4xl font-semibold">GMU Guesser</h1>
        <p className="my-2 text-xl text-gray-200">
          You're placed in a randomly photographed place on the Mason campus and
          are given a map. Find out where you are from what you know about the
          Mason campus, and earn points!
        </p>
        <button className="bg-green-500 p-2 outline outline-1 outline-green-500 rounded">
          Get started 🚀
        </button>
      </div>
    </InfoWrapper>
  );
}
