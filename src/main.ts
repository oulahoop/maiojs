import './style.css'
import { FAttachedCamera, FComponentEmpty, FRectangle, FScene } from '@fibbojs/2d'
import { fDebug } from '@fibbojs/devtools'
import { FKeyboard } from '@fibbojs/event'
import { loadLevel } from './level'
import Character from './classes/Character'

(async () => {
  const scene = new FScene()
  await scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  // Create a death zone
  const deathZone = new FComponentEmpty(scene, {
    position: { x: 0, y: -5 },
    scale: { x: 20, y: 0.1 },
  })
  deathZone.initCollider()
  scene.addComponent(deathZone)

  // Load level
  loadLevel(scene)

  /**
   * Create character
   */
  const character = new Character(scene)
  character.onCollisionWith(FRectangle, () => {
    console.log('Sprite collided with a square!')
  })
  character.onCollisionWith(deathZone, () => {
    character.setPosition({ x: 0, y: 5 })
    console.log('Sprite collided with the death zone!')
  })
  scene.addComponent(character)

  // Create keyboard
  const keyboard = new FKeyboard(scene)
  keyboard.onKeyDown('p', () => {
    character.setPosition({ x: 0, y: 5 })
  })

  // Attach a camera to the character
  scene.camera = new FAttachedCamera(scene, {
    target: character,
  })
})()
