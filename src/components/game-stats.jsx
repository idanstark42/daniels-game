export default function GameStats ({ runtime }) {
  const currentPlayer = runtime.currentPlayer
  return <div className='stats'>
    <div>{currentPlayer.hp}/{currentPlayer.maxHP}</div>
    <div>{currentPlayer.mana}/{currentPlayer.maxMana}</div>
    <div>Armor: 0</div>
    <div>Speed: 5</div>
  </div>
}