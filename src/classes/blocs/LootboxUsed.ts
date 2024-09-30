import { FScene, FSprite, FComponentEmpty } from '@fibbojs/2d'
import Character from "../Character.ts";

export default class LootboxUsed extends FSprite {
    topSensor: FComponentEmpty

    public constructor(scene: FScene, position: { x: number, y: number }) {
        super(scene,  {
            texture: 'sprites/lootbox_used.png',
            position: position
        })

        this.topSensor = new FComponentEmpty(this.scene, {
            position : {
                x: this.position.x,
                y: this.position.y + 0.2
            }
        })

        this.initSensorAndCollider()
        this.initCollision()
        this.addToScene()
    }

    initSensorAndCollider() {
        this.topSensor.initSensor()
        this.initCollider()
        this.initSensor({
            'scale': {x: 0.8, y: 0.2},
            'position': {x: 0, y: -0.5},
        })
    }

    initCollision() {
        // If the character collides with the top sensor, it means it's on top of the bloc
        this.topSensor.onCollisionWith(Character, ({component}) => {
            const character = component as Character
            if(!character.controller.jumpAvailable) {
                character.controller.jumpAvailable = true
            }
        })

        // If the character collides with the bloc, it means it's hitting it from the bottom
        this.onCollisionWith(Character, ({component}) => {
            const character = component as Character
            character.controller.yVelocity = 0
        })
    }

    addToScene() {
        this.scene.addComponent(this)
        this.scene.addComponent(this.topSensor)
    }
}