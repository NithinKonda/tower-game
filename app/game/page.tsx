"use client"
import React from 'react'
import GameBoard from '../components/GameBoard'
import PlayerStats from '../components/PlayerStats'
import { useState } from 'react'
import TowerMenu from '../components/TowerMenu'
const Game = () => {
    const [towers,setTowers] = useState([]);
    const [enemy,setEnemies] = useState([]);
    const [playerStats,SetPlayerStats] = useState({health : 100, money:50});


    const handlePlaceTower = (position) =>
    {
        setTowers([...towers, {position, type: 'basic'}])
        SetPlayerStats({...playerStats, money : playerStats.money - 10})
    }
    return (
        <div> 
            <PlayerStats stats = {playerStats}/>
            <GameBoard towers={towers} enemies={enemy} onPlaceTower = {handlePlaceTower}/>
            <TowerMenu onBuildTower={handlePlaceTower} />
        </div>
    )
}

export default Game