import { FScene } from '@fibbojs/2d'
import { FComponentEmpty } from '@fibbojs/2d'
import Character from "../Character.ts";

export default abstract class Generator {
    scene: FScene
    character: Character
    texture: string = ''

    protected constructor(scene: FScene, character: Character) {
        this.scene = scene
        this.character = character
    }

    generate(position: { x: number, y: number }, scale: { x: number, y: number } = { x: 1, y: 1 }) {
        let secretSensor = new FComponentEmpty(this.scene, {
            position : { x: position.x, y: position.y + 0.2 },
            scale: scale
        })

        secretSensor.initSensor()

        this.character.onCollisionWith(secretSensor, () => {
            if(!this.character.controller.jumpAvailable) {
                this.character.controller.jumpAvailable = true
            }
        })

        this.scene.addComponent(secretSensor)
    }

}