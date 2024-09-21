import React from 'react'

const TowerMenu = ({onBuildTower}) => {
  return (
    <div className='flex justify-center mt-4'>
        <button
            className='bg-gray-700 text-white px-4 py-2 rouned hover:bg-gray-300'
            onClick={() => onBuildTower({type: 'basic',cost:10})}
        >Build Basic Tower</button>
    </div>
  )
}

export default TowerMenu