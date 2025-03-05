import { useState } from 'react'
import './App.css'

const smallButtonsLevel = () => ({
  instructions: 'לחצי על הכפתור הורוד',
  initialState: {},
  content: (_state, _setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
    {new Array(30).fill(1).map((_, i) => <button key={i} style={{ background: 'rgb(59, 208, 228)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
    {new Array(1).fill(1).map((_, i) => <button onClick={nextLevel} key={i} style={{ background: 'rgb(228, 59, 161)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
  </div>
})

const movingButtonLevel = speed => ({
  instructions: 'לחצי על הכפתור הורוד',
  initialState: { position: { x: 50, y: 50 }, speed },
  content: (state, _setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
    {new Array(1).fill(1).map((_, i) => <button onClick={nextLevel} key={i} style={{ background: 'rgb(228, 59, 161)', width: 40, height: 40, position: 'absolute', top: `${state.position.x}%`, left: `${state.position.x}%` }}></button>)}
    </div>,
  initialize: (_state, setState) => {
    const interval = setInterval(() => {
      setState(state => {
        let newState = { ...state, position: { x: state.position.x + state.speed.x, y: state.position.y + state.speed.y } }
        if (newState.position.x > 90 || newState.position.x < 10) newState = { ...newState, speed: { x: -state.speed.x, y: state.speed.y } }
        if (newState.position.y > 90 || newState.position.y < 10) newState = { ...newState, speed: { x: state.speed.x, y: -state.speed.y } }
        return newState
      })
    }, 1)
    setState(state => ({ ...state, interval }))
  },
  close: (state) => {
    clearInterval(state.interval)
  }
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
  smallButtonsLevel(),
  smallButtonsLevel(),
  smallButtonsLevel(),
  smallButtonsLevel(),
  {
    instructions: '',
    initialState: {},
    content: (_state, _setState, nextLevel) => <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ fontSize: 50 }}>עד עכשיו היה קל? אז בואי ננסה קשה יותר</div>
      <button onClick={nextLevel} style={{ background: 'rgb(59, 208, 228)', padding: '1rem', fontSize: '1.2rem' }}>המשיכי לשלב הבא</button>
    </div>
  },
  movingButtonLevel({ x: 0.05, y: 0.05 }),
  movingButtonLevel({ x: 0.1, y: -0.01 }),
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

  const nextLevel = () => {
    if (LEVELS[level].close) LEVELS[level].close(state, setState)
    if (LEVELS[level + 1].initialize) LEVELS[level + 1].initialize(state, setState)
    setState(LEVELS[level + 1].initialState || {})
    setLevel(level + 1)
  }

  return <>
    <div className='title'>שלב {level}</div>
    <div className='instructions'>{LEVELS[level].instructions}</div>
    <div className='content'>{LEVELS[level].content(state, setState, nextLevel)}</div>
  </>
}

export default App
