import { FSprite } from '@fibbojs/2d'
import { FScene } from '@fibbojs/2d'
import {CharacterController} from "./controllers/CharacterController.ts";

export default class Character extends FSprite {
  controller: CharacterController

  constructor(scene: FScene) {
    super(scene, {
      texture: 'sprites/character.png',
      position: { x: 2, y: 10 },
      scale: { x: 1, y: 1 },
    })

    // Initialize the character controller
    this.controller = new CharacterController(scene, {
      component: this,
      speed: 1.2
    })

  }
}
