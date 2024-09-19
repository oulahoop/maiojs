import './style.css'
import { FScene } from '@fibbojs/2d'
import LevelOne from './classes/levels/LevelOne'
import { fDebug } from '@fibbojs/devtools'
import { FKeyboard } from '@fibbojs/event'
import Character from './classes/Character'
import { Camera } from "./classes/camera/Camera.ts";

(async () => {
  const scene = new FScene()
  await scene.init()
  await scene.initPhysics()
  // Debug the scene
  if (import.meta.env.DEV)
    fDebug(scene)

  scene.world.gravity.y = -15
  const character = new Character(scene)

  // Load level one
  const levelOne = new LevelOne(scene, character)
  levelOne.loadLevel()

  // Create keyboard
  const keyboard = new FKeyboard(scene)
  keyboard.onKeyDown('p', () => {
    character.setPosition({ x: 0, y: 5 })
  })

  scene.camera = new Camera(scene, {
    target: character,
    constY: -5,
    zoom: 1000
  })
})()
