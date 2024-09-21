import React from 'react'

const Enemy = ({position}:{position : any}) => {
  return (
    <div className='bg-red-600 text-white w-12 h-12 flex justify-center items-center rounded-full absolute'
      style={{left : `${position.x * 4}rem`, top: `${position.y * 4}rem`}}
    >
      E
    </div>
  )
}

export default Enemy