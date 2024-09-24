export default function Enemy({ position }: {
  position: { x: number, y: number }
}) {
  return (
    <div
      className="bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full absolute"
      style={{ left: `${position.x * 4}rem`, top: `${position.y * 4}rem` }} // Move based on position
    >
      E
    </div>
  );
}
