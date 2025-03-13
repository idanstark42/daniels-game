import CharacterPreview from '../components/character-preview'
import PLAYER_ANIMATIONS from './player-animations'

export default function CharacterSelection ({ runtime }) {
  return <div className='character-selection'>
    {[...Object.keys(PLAYER_ANIMATIONS)].map(character => <div key={character} className='character' onClick={() => runtime.chooseCharacter(character)}>
      {character.replace(/_/g, ' ')}
      <CharacterPreview character={PLAYER_ANIMATIONS[character]} />
    </div>)}
  </div>
}