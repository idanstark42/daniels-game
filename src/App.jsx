import { useEffect, useState } from 'react'
import './App.css'

const messageLevel = message => ({
  instructions: '',
  initialState: {},
  content: (_state, _setState, nextLevel) => <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <div style={{ fontSize: 50 }}>{message}</div>
    <button onClick={nextLevel} style={{ background: 'rgb(59, 208, 228)', padding: '1rem', fontSize: '1.2rem' }}>המשיכי לשלב הבא</button>
  </div>
})

const smallButtonsLevel = count => ({
  instructions: 'לחצי על הכפתור הורוד',
  initialState: {},
  content: (_state, _setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
    {new Array(count).fill(1).map((_, i) => <button key={i} style={{ background: 'rgb(59, 208, 228)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
    {new Array(1).fill(1).map((_, i) => <button onClick={nextLevel} key={i} style={{ background: 'rgb(228, 59, 161)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
  </div>
})

const movingButtonLevel = (count, speed = 0.075) => {

  const randomVector = magnitude => {
    const angle = 2 * Math.PI * Math.random()
    return { x: magnitude * Math.cos(angle), y: magnitude * Math.sin(angle) }
  }
  
  const addVectors = (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y })
  
  const handleMovement = (position, speed) => {
    let newPosition = addVectors(position, speed)
    if (newPosition.x > 90 || newPosition.x < 10) speed = { x: -speed.x, y: speed.y }
    if (newPosition.y > 90 || newPosition.y < 10) speed = { x: speed.x, y: -speed.y }
    newPosition.x = Math.max(10, Math.min(90, newPosition.x))
    newPosition.y = Math.max(10, Math.min(90, newPosition.y))
    return { position: newPosition, speed }
  }

  return ({
    instructions: 'לחצי על הכפתור הורוד',
    initialState: { position: { x: 50, y: 50 }, speed: randomVector(speed), fillerPositions: new Array(count).fill(1).map(() => ({ x: 10 + 80*Math.random(), y: 10 + 80*Math.random() })), fillerSpeeds: new Array(count).fill(1).map(() => randomVector(speed)) },
    content: (state, _setState, nextLevel) => (state.position && state.fillerPositions.length === count) ? <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
      {new Array(count).fill(1).map((_, i) => <button key={i} style={{ background: 'rgb(59, 208, 228)', width: 40, height: 40, position: 'absolute', top: `${state.fillerPositions[i].y}%`, left: `${state.fillerPositions[i].x}%` }}></button>)}
      {new Array(1).fill(1).map((_, i) => <button onClick={nextLevel} key={i} style={{ background: 'rgb(228, 59, 161)', width: 40, height: 40, position: 'absolute', top: `${state.position.y}%`, left: `${state.position.x}%` }}></button>)}
    </div> : '',
    initialize: (_state, setState) => {
      const interval = setInterval(() => {
        setState(state => {
          if (!state.position) return state
          let newState = { ...state, ...handleMovement(state.position, state.speed), interval }
          for (let i = 0; i < count; i++) {
            const newPositionAndSpeed = handleMovement(state.fillerPositions[i], state.fillerSpeeds[i])
            newState.fillerPositions[i] = newPositionAndSpeed.position
            newState.fillerSpeeds[i] = newPositionAndSpeed.speed
          }
          return newState
        })
      }, 1)
    },
    close: (state) => {
      clearInterval(state.interval)
    }
  })
}

const letterLevel = letter => ({
  instructions: `לחצי על הכפתור במקלדת עם האות ${letter}`,
  initialState: {},
  initialize: (_state, setState, nextLevel) => {
    const handleKeyDown = e => {
      if (e.key === letter) {
        nextLevel()
        window.removeEventListener('keypress', handleKeyDown)
      }
    }
    setState({ handleKeyDown })
    window.addEventListener('keypress', handleKeyDown)
  },
  close: (state, _setState) => {
    window.removeEventListener('keypress', state.handleKeyDown)
  },
  content: () => <div style={{ fontSize: '30rem' }}>{letter}</div>
})

const textLevel = text => ({
  instructions: `כתבי "${text}"`,
  initialState: { text, written: 0 },
  initialize: (_state, setState, nextLevel) => {
    const handleKeyDown = e => {
      setState(state => {
        const newState = { ...state }
        const nextLetterToWrite = state.text[state.written]
        if (e.key === nextLetterToWrite) {
          newState.written = state.written + 1
          if (newState.written === state.text.length) {
            nextLevel()
            window.removeEventListener('keypress', handleKeyDown)
          }
        }
        return newState
      })
    }
    setState(state => ({ ...state, handleKeyDown }))
    window.addEventListener('keypress', handleKeyDown)
  },
  close: (state, _setState) => {
    window.removeEventListener('keypress', state.handleKeyDown)
  },
  content: (state) => <div style={{ fontSize: '10rem' }}>{text.split('').map((letter, i) => <span style={{ color: i < state.written ? 'inherit': 'white' }}>{letter}</span>)}</div>
})

const LEVELS = [{},
  {
    instructions: 'לחצי על הכפתור הורוד',
    initialState: {},
    content: (_state, _setState, nextLevel) => <button onClick={nextLevel} style={{ background: 'rgb(228, 59, 161)', width: 300, height: 300 }}></button>
  }, {
    instructions: 'לחצי על הכפתור הורוד',
    initialState: {},
    content: (_state, _setState, nextLevel) => <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={nextLevel} style={{ background: 'rgb(228, 59, 161)', width: 300, height: 300 }}></button>
      <button style={{ background: 'rgb(59, 208, 228)', width: 300, height: 300 }}></button>
    </div>
  },
  smallButtonsLevel(2),
  smallButtonsLevel(2),
  smallButtonsLevel(6),
  smallButtonsLevel(6),
  smallButtonsLevel(10),
  smallButtonsLevel(20),
  smallButtonsLevel(30),
  messageLevel('עד עכשיו היה קל? אז בואי ננסה קשה יותר'),
  movingButtonLevel(2),
  movingButtonLevel(2),
  movingButtonLevel(6),
  movingButtonLevel(6),
  movingButtonLevel(10),
  movingButtonLevel(20),
  movingButtonLevel(30),
  messageLevel('עכשיו ננסה משהו אחר...'),
  letterLevel('א'),
  letterLevel('ב'),
  letterLevel('ג'),
  letterLevel('ד'),
  letterLevel('ה'),
  letterLevel('ו'),
  letterLevel('ז'),
  letterLevel('ח'),
  letterLevel('ט'),
  letterLevel('י'),
  letterLevel('כ'),
  letterLevel('ל'),
  letterLevel('מ'),
  letterLevel('נ'),
  letterLevel('ס'),
  letterLevel('ע'),
  letterLevel('פ'),
  letterLevel('צ'),
  letterLevel('ק'),
  letterLevel('ר'),
  letterLevel('ש'),
  letterLevel('ת'),
  textLevel('דניאל'),
  textLevel('שלום מחשב'),
  textLevel('אני כותבת'),
  textLevel('קוראים לי דניאל ואני כותבת במחשב'),
  {
    instructions: '',
    initialState: {},
    content: (_state, _setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 50 }}>סיימת!</div>
    </div>,
  }
]

function App() {
  const [level, setLevel] = useState(1)
  const [state, setState] = useState(LEVELS[1].initialState || {})

  const nextLevel = () => setLevel(lvl => lvl + 1)

  useEffect(() => {
    if (LEVELS[level - 1].close) LEVELS[level - 1].close(state, setState)
    setState(LEVELS[level].initialState || {})
    if (LEVELS[level].initialize) LEVELS[level].initialize(state, setState, nextLevel)
  }, [level])

  return <>
    <div className='title'>שלב {level}</div>
    <div className='instructions'>{LEVELS[level].instructions}</div>
    <div className='content'>{LEVELS[level].content(state, setState, nextLevel)}</div>
  </>
}

export default App
