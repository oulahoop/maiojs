import { FScene, FSprite, FComponentEmpty } from '@fibbojs/2d'
import Character from "../Character.ts";
import LootboxUsed from "./LootboxUsed.ts";
import Mushroom from "./Mushroom.ts";
import Coin from "./Coin.ts";

export default class Lootbox extends FSprite {
    topSensor: FComponentEmpty
    audio= new Audio('maiojs/assets/sounds/oof.mp3')
    type: 'coin' | 'mushroom'

    public constructor(scene: FScene, position: { x: number, y: number }, content: 'coin' | 'mushroom' = 'coin') {
        super(scene,  {
            texture: 'sprites/lootbox.png',
            position: position
        })

        this.type = content

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
            this.audio.play()
            const character = component as Character
            character.controller.yVelocity = 0
            this.scene.removeComponent(this)
            this.scene.removeComponent(this.topSensor)
            if(this.type === 'coin') {
                new Coin(this.scene, {x: this.position.x, y: this.position.y + 1})
            } else {
                new Mushroom(this.scene, {x: this.position.x, y: this.position.y + 1})
            }
            new LootboxUsed(this.scene, this.position)
        })
    }

    addToScene() {
        this.scene.addComponent(this)
        this.scene.addComponent(this.topSensor)
    }
}