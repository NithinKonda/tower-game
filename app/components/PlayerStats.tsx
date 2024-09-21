export default function PlayerStats({ stats }) {
    return (
      <div className="flex justify-between bg-gray-800 p-4 w-full max-w-md rounded mb-4">
        <p className="text-green-400">Health: {stats.health}</p>
        <p className="text-yellow-400">Money: {stats.money}</p>
      </div>
    );
  }
  