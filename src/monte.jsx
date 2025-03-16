import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const ThreeCardMonte = () => {
  const [cards, setCards] = useState(['A', 'B', 'C'])
  const [selected, setSelected] = useState(null)
  const [shuffling, setShuffling] = useState(false)

  useEffect(() => {
    shuffleCards()
  }, [])

  const shuffleCards = () => {
    setShuffling(true)
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setTimeout(() => {
      setCards(shuffled)
      setShuffling(false)
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
        {cards.map((card, index) => (
          <motion.div
            key={card}
            style={{
              width: '80px',
              height: '120px',
              backgroundColor: selected === card ? 'blue' : 'gray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '10px',
              position: 'absolute',
              left: `${index * 90}px`,
            }}
            animate={{ x: shuffling ? [20, -20, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelected(card)}
          >
            {selected && (card === winner ? '✔️' : '❌')}
          </motion.div>
        ))}
      </div>
      <button 
        onClick={shuffleCards} 
        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Shuffle
      </button>
    </div>
  )
}

export default ThreeCardMonte
