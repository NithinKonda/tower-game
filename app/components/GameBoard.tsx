import React from 'react'
import Tower from './Tower';
import Enemy from './Enemy';
const GameBoard = ({towers,enemies,onPlaceTower}) => {
    const gridSize = 10;

    const renderGrid = () =>
    {
        const grid = [];
        for(let row = 0; row < gridSize; row++)
        {
            for(let col = 0; col < gridSize; col++)
            {
                grid.push(
                    <div
                        key={`${row} - ${col}`}
                        className='w-16 h-16 border-gray-500 hover:bg-gray-200 flex items-center justify-center'
                        onClick={() => onPlaceTower({ x:col , y:row})}
                        >
                            {towers.find(tower => tower.position.x === col && tower.position.y === row) && <Tower />}
                        </div>
                )
            }
        }
        return grid;
    }

  return (
    <div className='grid grid-cols-10 gap-1 bg-gray-900 p-4'>
        {renderGrid()}
        {enemies.map((enemy, index) => (
            <Enemy key={index} position={enemy.position} />
        ))}
    </div>
  )
}

export default GameBoard