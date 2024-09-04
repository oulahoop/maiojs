import type { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'

function addGround(scene: FScene, position: { x: number, y: number }) {
  const ground = new FSprite(scene, {
    texture: 'ground_0022.png',
    position,
  })
  ground.initCollider()
  scene.addComponent(ground)
}

export function loadLevel(scene: FScene) {
  // Create the ground
  for (let x = 0; x < 10; x++) {
    addGround(scene, { x: x - 4.5, y: -1 })
  }

  // Add platforms
  addGround(scene, { x: 6, y: 3 })
  addGround(scene, { x: 7, y: 3 })
}
