"use client"
import { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import PlayerStats from '../components/PlayerStats';
import TowerMenu from '../components/TowerMenu';

export default function GamePage() {
  const [towers, setTowers] = useState([]);
  const [enemies, setEnemies] = useState([
    { position: { x: 0, y: 0 }, speed: 0.005, health: 100, progress: 0 }, // Add progress for interpolation
  ]);
  const [playerStats, setPlayerStats] = useState({ health: 100, money: 50 });

  const handlePlaceTower = (position) => {
    setTowers([...towers, { position, type: 'basic' }]);
  };

  const path = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
    { x: 9, y: 1 },
    { x: 9, y: 2 },
    { x: 9, y: 3 },
  ];

  // Ref to store animation frame
  const animationRef = useRef();

  const updateEnemyPosition = () => {
    setEnemies((currentEnemies) =>
      currentEnemies.map((enemy) => {
        const currentIndex = Math.floor(enemy.progress); // Find the current point on the path
        const nextIndex = currentIndex + 1;

        if (nextIndex < path.length) {
          const currentPoint = path[currentIndex];
          const nextPoint = path[nextIndex];

          // Interpolation between current and next points
          const progressBetweenPoints = enemy.progress - currentIndex;

          const newX = currentPoint.x + (nextPoint.x - currentPoint.x) * progressBetweenPoints;
          const newY = currentPoint.y + (nextPoint.y - currentPoint.y) * progressBetweenPoints;

          // Increase progress based on speed
          const newProgress = enemy.progress + enemy.speed;

          return {
            ...enemy,
            position: { x: newX, y: newY },
            progress: newProgress, // Keep updating progress
          };
        } else {
          return enemy; // Enemy stays at the final point if the path ends
        }
      })
    );

    // Continue the animation
    animationRef.current = requestAnimationFrame(updateEnemyPosition);
  };

  useEffect(() => {
    // Start the animation loop
    animationRef.current = requestAnimationFrame(updateEnemyPosition);

    // Cleanup on component unmount
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <PlayerStats stats={playerStats} />
      <GameBoard towers={towers} enemies={enemies} onPlaceTower={handlePlaceTower} />
      <TowerMenu onBuildTower={handlePlaceTower} />
    </div>
  );
}
