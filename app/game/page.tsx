"use client"
import { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import PlayerStats from '../components/PlayerStats';
import TowerMenu from '../components/TowerMenu';

export default function GamePage() {
  const [towers, setTowers] = useState([]);
  const [enemies, setEnemies] = useState([
    { position: { x: 0, y: 0 }, speed: 0.005, health: 100, progress: 0 },
  ]);
  const [playerStats, setPlayerStats] = useState({ health: 100, money: 50 });

  const handlePlaceTower = (position) => {
    setTowers([...towers, { position, type: 'basic' }]);

    setPlayerStats((prevStats) => ({
      ...prevStats,
      money: prevStats.money - 10,
    }));
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

  const animationRef = useRef();

  const updateEnemyPosition = () => {
    setEnemies((currentEnemies) => {
      return currentEnemies
        .map((enemy) => {
          const currentIndex = Math.floor(enemy.progress);
          const nextIndex = currentIndex + 1;

          if (nextIndex >= path.length) {
            setPlayerStats((prevStats) => ({
              ...prevStats,
              health: prevStats.health - 10,
            }));
            return null;
          } else {
            const currentPoint = path[currentIndex];
            const nextPoint = path[nextIndex];

            const progressBetweenPoints = enemy.progress - currentIndex;
            const newX = currentPoint.x + (nextPoint.x - currentPoint.x) * progressBetweenPoints;
            const newY = currentPoint.y + (nextPoint.y - currentPoint.y) * progressBetweenPoints;
            const newProgress = enemy.progress + enemy.speed;

            return {
              ...enemy,
              position: { x: newX, y: newY },
              progress: newProgress,
            };
          }
        })
        .filter(Boolean);
    });

    animationRef.current = requestAnimationFrame(updateEnemyPosition);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateEnemyPosition);
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
