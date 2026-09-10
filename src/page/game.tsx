import desktopCenterBg from '../assets/desktop/minigame/Center_background.jpg'
import desktopLeftBg from '../assets/desktop/minigame/Left_background .jpg'
import desktopRightBg from '../assets/desktop/minigame/Right_background.jpg'
import mobileCenterBg from '../assets/mobile/minigame/Background with the character in the center (phone aspect ratio).jpg'
import mobileLeftBg from '../assets/mobile/minigame/Left_Background.jpg'
import mobileRightBg from '../assets/mobile/minigame/Righ_Background.jpg'
import characterCenter from '../assets/character/Character_middle.png'
import characterLeft from '../assets/character/Character_left.png'
import characterRight from '../assets/character/Character_right.png'
import CharacterDragScene from '../components/character-drag-scene'

function Game() {
  return (
    <div className="relative">
      <CharacterDragScene
        desktopBackgrounds={{
          left: desktopLeftBg,
          center: desktopCenterBg,
          right: desktopRightBg,
        }}
        mobileBackgrounds={{
          left: mobileLeftBg,
          center: mobileCenterBg,
          right: mobileRightBg,
        }}
        character={{
          left: characterLeft,
          center: characterCenter,
          right: characterRight,
        }}
      />
    </div>
  )
}

export default Game
