import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import { FComponentEmpty } from '@fibbojs/2d'

export default abstract class Generator {
    scene: FScene
    character: FSprite
    texture: string = ''

    protected constructor(scene: FScene, character: FSprite) {
        this.scene = scene
        this.character = character
    }

    generate(position: { x: number, y: number }): FSprite {
        let secretSensor = new FComponentEmpty(this.scene, {
            position
        })

        secretSensor.initSensor({
            'scale': {x: 0.8, y: 0.2},
            'position': {x: 0, y: 0.5},
        })

        this.character.onCollisionWith(secretSensor, () => {
            if(!this.character.controller.jumpAvailable) {
                this.character.controller.jumpAvailable = true
            }
        })

        this.scene.addComponent(secretSensor)
    }

}