export default function Enemy({ position }) {
  const gridSize = 4; // Assuming each grid cell is 4rem x 4rem

  return (
    <div
      className="bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full absolute"
      style={{
        left: `${position.x * gridSize}rem`,
        top: `${position.y * gridSize}rem`,
        transform: `translate(-50%, -50%)`, // Center the enemy within the grid cell
        transition: 'transform 0.1s linear', // Optional smooth transition
      }}
    >
      E
    </div>
  );
}
