"use client"
import { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import PlayerStats from '../components/PlayerStats';
import TowerMenu from '../components/TowerMenu';

export default function GamePage() {
  const [towers, setTowers] = useState([]);
  const [enemies, setEnemies] = useState([
    { position: { x: 0, y: 0 }, speed: 1, health: 100 }, // Initial enemy
  ]);
  const [playerStats, setPlayerStats] = useState({ health: 100, money: 50 });

  const handlePlaceTower = (position) => {
    setTowers([...towers, { position, type: 'basic' }]);
  };

  // Predefined path (array of positions) for the enemy to follow
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
    // Add more points for the path as necessary
  ];

  // Move enemies along the path over time
  useEffect(() => {
    const moveEnemies = setInterval(() => {
      setEnemies((currentEnemies) => {
        return currentEnemies.map((enemy) => {
          const currentIndex = path.findIndex(
            (point) => point.x === enemy.position.x && point.y === enemy.position.y
          );
          if (currentIndex < path.length - 1) {
            return { ...enemy, position: path[currentIndex + 1] }; // Move to next point
          } else {
            return enemy; // Stay at the last point if the path ends
          }
        });
      });
    }, 1000 / enemies[0].speed); // Move based on enemy speed (adjust interval as needed)

    return () => clearInterval(moveEnemies); // Cleanup interval on unmount
  }, [enemies, path]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <PlayerStats stats={playerStats} />
      <GameBoard towers={towers} enemies={enemies} onPlaceTower={handlePlaceTower} />
      <TowerMenu onBuildTower={handlePlaceTower} />
    </div>
  );
}
