import VIRUS from './assets/virus.gif'

export const messageLevel = (message, next) => ({
  instructions: '',
  initialState: {},
  content: (_state, _setState, nextLevel) => <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <div style={{ fontSize: 50 }}>{message}</div>
    {next ? <button onClick={nextLevel} style={{ background: 'rgb(59, 208, 228)', padding: '1rem', fontSize: '1.2rem' }}>המשיכי לשלב הבא</button> : ''}
  </div>
})

export const smallButtonsLevel = count => ({
  instructions: 'לחצי על הכפתור הורוד',
  initialState: {},
  content: (_state, _setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
    {new Array(count).fill(1).map((_, i) => <button key={i} style={{ background: 'rgb(59, 208, 228)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
    {new Array(1).fill(1).map((_, i) => <button onClick={nextLevel} key={i} style={{ background: 'rgb(228, 59, 161)', width: 40, height: 40, position: 'absolute', top: `${10 + 80*Math.random()}%`, left: `${10 + 80*Math.random()}%` }}></button>)}
  </div>
})

export const movingButtonLevel = (count, speed = 0.05) => {

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

export const letterLevel = letter => ({
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

export const textLevel = text => ({
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

export const threeDigitsLevel = (digits = 523) => ({
  instructions: '',
  initialState: { digits, input: '000' },
  content: (state, setState, nextLevel) => !Boolean(state.input) ? '' : <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
    <input type='number' value={state.input[0]} style={{ width: 50, height: 50, fontSize: 30 }} onChange={e => setState({ ...state, input: e.target.value + state.input.slice(1) })} />
    <input type='number' value={state.input[1]} style={{ width: 50, height: 50, fontSize: 30 }} onChange={e => setState({ ...state, input: state.input[0] + e.target.value + state.input[2] })} />
    <input type='number' value={state.input[2]} style={{ width: 50, height: 50, fontSize: 30 }} onChange={e => setState({ ...state, input: state.input.slice(0, 2) + e.target.value })} />
    <button onClick={() => state.input === state.digits.toString() ? nextLevel() : alert('נסי שוב')} style={{ background: 'rgb(228, 59, 161)', padding: '1rem', fontSize: '1.2rem' }}>אישור</button>
  </div>
})

export const roomEntranceKeyLevel = (background, key) => ({
  instructions: '',
  initialState: { key, written: 0 },
  initialize: (_state, setState, nextLevel) => {
    const handleKeyDown = e => {
      setState(state => {
        const newState = { ...state }
        const nextLetterToWrite = state.key[state.written]
        if (e.key === nextLetterToWrite) {
          newState.written = state.written + 1
          if (newState.written === state.key.length) {
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
  content: (state) => <div className='background' style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    <div style={{ fontSize: '10rem', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      {key.split('').map((letter, i) => <span style={{ color: i < state.written ? 'inherit': 'white' }}>{letter}</span>)}
    </div>
  </div>
})

export const roomVirusesLevel = (background, viruses) => ({
    instructions: '',
    initialState: { viruses: new Array(viruses).fill(1).map(() => ({ x: 10 + 80*Math.random(), y: 10 + 80*Math.random(), size: 20 + 80*Math.random() })) },
    content: (state, setState, nextLevel) => !Boolean(state.viruses) ? '' : <div style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {state.viruses.map((virus, i) => <img src={VIRUS} key={i} style={{ width: virus.size, height: virus.size, position: 'absolute', top: `${virus.y}%`, left: `${virus.x}%` }} onClick={() => {
            setState({ viruses: state.viruses.filter((_, j) => i !== j) })
            if (state.viruses.length === 1) nextLevel()
        }} />)}
    </div>
})

export const roomCodeLevel = (background, initialState, children) => ({
    instructions: '',
    initialState,
    content: (state, setState, nextLevel) => <div style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {children(state, setState, nextLevel)}
    </div>
})
