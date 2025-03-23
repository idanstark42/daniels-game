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

export const computerLevel = parts => {
  const shuffle = array => {
    const newArray = []
    while (array.length > 0) {
      const index = Math.floor(Math.random() * array.length)
      newArray.push(array[index])
      array.splice(index, 1)
    }
    return newArray
  }

  const images = shuffle(parts.map(part => part.image))
  const names = shuffle(parts.map(part => part.name))

  return {
    instructions: '',
    initialState: { connections: [], hold: null, wrong: null, parts, buttons: names.map((name, index) => ({ value: name, x: 20, y: index*25, type: 'name' })).concat(images.map((image, index) => ({ value: image, x: 60, y: index*25, type: 'image' }))) },
    content: (state, setState, nextLevel) => !Boolean(state.buttons) ? '' : <div style={{ width: '100%', height: '90vh', position: 'relative' }}>
      {state.buttons.filter(button => state.connections.every(conn => !conn.includes(button))).map((button, i) => <button style={{ borderWidth: '2px', borderStyle: 'solid', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', position: 'absolute', top: `${button.y}%`, left: `${button.x}%`, width: 160, height: 160, backgroundColor: state.hold === button ? 'blue' : state.wrong?.includes(button) ? 'red' : 'white', borderColor: state.hold === button ? 'blue' : state.wrong?.includes(button) ? 'red' : 'white', padding: 0 }}
        onClick={() => {
          if (state.hold === null) {
            setState({ ...state, hold: button })
          } else {
            if (state.hold && state.hold === button) { // canceling connection
              setState({ ...state, hold: null })
            } else {
              // correct connection is a letter and a number, i.e. א and 1.
              const firstButtonType = state.hold.type
              const secondButtonType = button.type
              const firstButtonPart = state.parts.find(part => part[firstButtonType] === state.hold.value)
              const secondButtonPart = state.parts.find(part => part[secondButtonType] === button.value)
              
              if (firstButtonType !== secondButtonType && firstButtonPart && secondButtonPart && firstButtonPart.name === secondButtonPart.name) {
                setState({ ...state, connections: [...state.connections, [state.hold, button]], hold: null })
                if (state.connections.length === state.buttons.length / 2 - 1) nextLevel()
              } else {
                setState({ ...state, wrong: [state.hold, button], hold: null })
                setTimeout(() => {
                  setState({ ...state, hold: null, wrong: null })
                }, 1000)
              }
            }
          }
        }}
        >
        {button.type === 'name' ? button.value : <img src={button.value} style={{ width: '100%', height: '100%' }} />}
      </button>)}
    </div>
  }
}

export const internetLevel = (background, allInternetImage, stuff, showAll, next) => ({
  instructions: '',
  initialState: { showingAllInternet: false, showingGoodstuff: false, stuffIndex: 0 },
  content: (state, setState, nextLevel) => !state.hasOwnProperty('stuffIndex') ?  '' : <div className='background' style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    <button onClick={() => setState({ ...state, showingAllInternet: true })} style={{ position: 'absolute', top: '5%', left: '5%', width: '10rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
      כל האינטרנט
    </button>
    <button onClick={() => showAll ? '' : nextLevel()} style={{ opacity: showAll ? 0.8 : 1, pointerEvents: showAll ? 'none' : 'initial', position: 'absolute', bottom: '5%', left: '30%', width: '10rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
      שרת הכתובות
    </button>
    {!showAll ? '' : <>
      <button onClick={() => setState({ ...state, showingGoodstuff: true })} style={{ position: 'absolute', bottom: '15%', left: '50%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        7ג
      </button>
      <button onClick={() => next === '25ב' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '15%', left: '25%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        25ב
      </button>
      <button onClick={() => next === '13א' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '80%', left: '80%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        13א
      </button>
      <button onClick={() => next === '29ל' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '75%', left: '30%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        29ל
      </button>
      <button onClick={() => next === '8ד' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '55%', left: '85%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        8ד
      </button>
      <button onClick={() => next === '6ק' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '30%', left: '60%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        6ק
      </button>
      <button onClick={() => next === '3ז' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '40%', left: '40%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        3ז
      </button>
      <button onClick={() => next === '5ט' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '70%', left: '10%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        5ט
      </button>
      <button onClick={() => next === '9ס' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '20%', left: '10%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        9ס
      </button>
      <button onClick={() => next === '1פ' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '20%', left: '80%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        1פ
      </button>
      <button onClick={() => next === '2צ' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '50%', left: '70%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        2צ
      </button>
      <button onClick={() => next === '4ק' ? nextLevel() : ''} style={{ position: 'absolute', bottom: '80%', left: '50%', width: '4rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        4ק
      </button>
    </>}
    {state.showingAllInternet ? <div style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%', backgroundColor: 'rgb(0, 0, 0, 0.8)', color: 'white' }}>
      <img src={allInternetImage} style={{ width: '100%', height: '100%' }} />
      <button onClick={() => setState({ ...state, showingAllInternet: false })} style={{ position: 'absolute', top: 0, left: 0, width: '2rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        X
      </button>
    </div> : ''}
    {state.showingGoodstuff ? <div style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%', backgroundColor: 'rgb(0, 0, 0, 0.8)', color: 'white' }}>
      <img src={stuff[state.stuffIndex]} style={{ width: '100%', height: '100%' }} />
      <button onClick={() => setState({ ...state, showingGoodstuff: false })} style={{ position: 'absolute', top: 0, left: 0, width: '2rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        X
      </button>
      {state.stuffIndex >= stuff.length - 1 ? '' : <button onClick={() => setState({ ...state, stuffIndex: (state.stuffIndex + 1) % stuff.length })} style={{ position: 'absolute', bottom: 0, right: 0, height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>
        הבא
      </button>}
    </div> : ''}
  </div>
})

export const dialogLevel = (background, dialog, allowExit) => ({
  instructions: '',
  initialState: { dialog, current: dialog.rootSegment },
  content: (state, setState, nextLevel) => {
    if (!state.dialog) return ''

    return <div className='background' style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem', boxSizing: 'border-box', textAlign: 'right', backgroundColor: 'rgb(0, 0, 0, 0.8)', color: 'white', display: 'flex', gap: 10, alignItems: 'right', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontStyle: 'italic' }}>{state.dialog.character}</div>
      {state.message ? <div style={{ fontSize: '1.2rem' }}>{state.message}</div> : <>
        <div style={{ fontSize: '1.2rem' }}>{state.current.text}</div>
        {state.current.choices.map(({ choice, next }) => <div onClick={() => {
          if (typeof next === 'string') {
            if (next === 'end') {
              nextLevel()
            } else {
              setState({ ...state, message: next })
              setTimeout(() => {
                setState({ ...state, message: null, current: dialog.rootSegment })
              }, 2000)
            }
          } else {
            setState({ ...state, current: next })
          }
        }} className='choice' style={{ cursor: 'pointer' }}>- {choice}</div>)}
      </>}
      {allowExit ? <button onClick={nextLevel} style={{ position: 'absolute', top: 0, left: 0, width: '2rem', height: '2rem', backgroundColor: 'rgb(0, 0, 0, 0.8)', fontSize: '1.2rem', color: 'white' }}>X</button> : ''}
    </div>
  </div>
  }
})

export const roomLookupLevel = (background, clickables) => ({
  instructions: clickables.map(clickable => clickable.name).join(', '),
  initialState: { clickables, found: [] },
  content: (state, setState, nextLevel) => !Boolean(state.clickables) ? '' : <div className='background' style={{ height: '80vh', aspectRatio: 1, position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    {clickables.filter(clickable => !state.found.includes(clickable)).map((clickable, i) => <button key={i} onClick={() => {
      setState({ ...state, found: [...state.found, clickable] })
      if (state.found.length === state.clickables.length - 1) {
        nextLevel()
      }
    }} style={{ position: 'absolute', top: `${clickable.y}%`, left: `${clickable.x}%`, width: `${clickable.w}%`, height: `${clickable.h}%`, backgroundColor: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}></button>)}
    {state.found.map((clickable, i) => <div key={i} style={{ position: 'absolute', top: `${clickable.y}%`, left: `${clickable.x}%`, width: `${clickable.w}%`, height: `${clickable.h}%`, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>{clickable.name}</div>)}
  </div>
})

export const roomHiddenCodeLevel = (background, code) => ({
  instructions: '',
  initialState: { input: '' },
  content: (state, setState, nextLevel) => !state.hasOwnProperty('input') ? '' : <div className='background' style={{ width: '100%', height: '80vh', position: 'relative', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    <div style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%', backgroundColor: 'rgb(0, 0, 0, 0.8)', color: 'white', display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <input type='text' style={{ width: '10rem', height: '2rem', fontSize: '1.2rem' }} value={state.input} onChange={e => setState({ input: e.target.value })} />
      <button onClick={() => state.input === code ? nextLevel() : alert('נסי שוב')} style={{ background: 'rgb(228, 59, 161)', padding: '1rem', fontSize: '1.2rem' }}>אישור</button>
    </div>
  </div>
})

