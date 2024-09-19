import { FScene, FSprite, FComponentEmpty } from '@fibbojs/2d'
import Character from "../Character.ts";

export default class Bloc extends FSprite {
    topSensor: FComponentEmpty
    audio= new Audio('maiojs/assets/oof.mp3')

    public constructor(scene: FScene, position: { x: number, y: number }) {
        super(scene,  {
            texture: 'bloc.png',
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
        this.topSensor.onCollisionWith(Character, ({component}) => {
            const character = component as Character
            if(!character.controller.jumpAvailable) {
                character.controller.jumpAvailable = true
            }
        })

        this.onCollisionWith(Character, ({component}) => {
            this.audio.play()
            const character = component as Character
            character.controller.yVelocity = 0
            this.scene.removeComponent(this)
            this.scene.removeComponent(this.topSensor)
        })
    }

    addToScene() {
        this.scene.addComponent(this)
        this.scene.addComponent(this.topSensor)
    }
}