export default function PlayerStats({ stats }) {
  return (
    <div className="mb-4">
      <div className="text-white">Health: {stats.health}</div>
      <div className="text-white">Money: {stats.money}</div>
    </div>
  );
}
