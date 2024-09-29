"use client"
import { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import PlayerStats from '../components/PlayerStats';
import TowerMenu from '../components/TowerMenu';

export default function GamePage() {
  const [towers, setTowers] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [playerStats, setPlayerStats] = useState({ health: 100, money: 50 });
  const [currentWave, setCurrentWave] = useState(1);
  const [isWaveActive, setIsWaveActive] = useState(false);

  const path = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 },
    { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 },
  ];


  const handlePlaceTower = (position) => {
    setTowers([...towers, { position, type: 'basic' }]);

    setPlayerStats((prevStats) => ({
      ...prevStats,
      money: prevStats.money - 10,
    }));
  };

  const animationRef = useRef();

  // Function to spawn enemies for the current wave
  const spawnEnemiesForWave = (wave) => {
    const numEnemies = 5 + wave * 2; // Increase the number of enemies with each wave
    const newEnemies = [];

    for (let i = 0; i < numEnemies; i++) {
      newEnemies.push({
        position: { x: 0, y: 0 },
        speed: 0.005 + wave * 0.001, // Increase speed slightly with each wave
        health: 100 + wave * 20, // Increase health with each wave
        progress: 0,
        spawnDelay: i * 1000, // Delay each enemy spawn by 1 second
      });
    }

    setEnemies(newEnemies);
    setIsWaveActive(true);
  };

  // Function to update enemy positions and handle enemy logic
  const updateEnemyPosition = () => {
    setEnemies((currentEnemies) => {
      return currentEnemies
        .map((enemy) => {
          const currentIndex = Math.floor(enemy.progress);
          const nextIndex = currentIndex + 1;

          // Check if enemy has reached the end of the path
          if (nextIndex >= path.length) {
            setPlayerStats((prevStats) => ({
              ...prevStats,
              health: prevStats.health - 10, // Deduct health
            }));
            return null; // Remove enemy from the game
          }

          const currentPoint = path[currentIndex];
          const nextPoint = path[nextIndex];
          const progressBetweenPoints = enemy.progress - currentIndex;
          const newX = currentPoint.x + (nextPoint.x - currentPoint.x) * progressBetweenPoints;
          const newY = currentPoint.y + (nextPoint.y - currentPoint.y) * progressBetweenPoints;
          const newProgress = enemy.progress + enemy.speed;

          return { ...enemy, position: { x: newX, y: newY }, progress: newProgress };
        })
        .filter(Boolean); // Filter out null enemies
    });

    animationRef.current = requestAnimationFrame(updateEnemyPosition);
  };

  // Start a new wave after the previous wave ends
  useEffect(() => {
    if (enemies.length === 0 && isWaveActive) {
      setIsWaveActive(false);

      // Delay between waves
      setTimeout(() => {
        setCurrentWave((prevWave) => prevWave + 1);
        spawnEnemiesForWave(currentWave + 1);
      }, 3000); // Wait 3 seconds before the next wave
    }
  }, [enemies, isWaveActive, currentWave]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateEnemyPosition);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Start the first wave on page load
  useEffect(() => {
    spawnEnemiesForWave(1);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <PlayerStats stats={playerStats} />
      <GameBoard towers={towers} enemies={enemies} onPlaceTower={handlePlaceTower} />
      <TowerMenu onBuildTower={handlePlaceTower} />
      <div className="text-white mt-4">Current Wave: {currentWave}</div>
    </div>
  );
}
