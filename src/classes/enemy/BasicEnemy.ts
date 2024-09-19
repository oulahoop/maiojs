import {FComponentEmpty, FScene} from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import {EnemyController} from "../controllers/EnemyController.ts";
import Character from "../Character.ts";
import {View} from "../views/View.ts";

export default class BasicEnemy extends FSprite {
    private positionInitiale = { x: 0, y: 0 }
    private positionFinale = { x: 0, y: 0 }
    public topSensor: FComponentEmpty

    private audio = new Audio('maiojs/assets/kill.mp3')

    constructor(scene: FScene,
                positionInitiale: { x: number, y: number },
                positionFinale: { x: number, y: number }
    ) {
        super(scene, {
            texture: 'goomba.png',
            position: positionInitiale,
            scale: { x: 1, y: 1 },
        })
        this.positionInitiale = positionInitiale
        this.positionFinale = positionFinale

        this.topSensor = new FComponentEmpty(this.scene, {
            position : {
                x: this.position.x,
                y: this.position.y + 0.2
            }
        })

        this.topSensor.initSensor({
            'scale': {x: 0.8, y: 0.3},
            'position': {x: 0, y: -0.5},
        })

        this.scene.addComponent(this.topSensor)
        this.scene.addComponent(this)

        this.initCollision()
        this.initController()
    }

    initCollision() {
        this.onCollisionWith(Character, () => {
            //this.scene.world.free()
            View.gameOver()
        })

        this.topSensor.onCollisionWith(Character, ({component}) => {
            this.audio.play()
            this.scene.removeComponent(this)
            this.scene.removeComponent(this.topSensor)

            const character = component as Character
            character.controller.yVelocity = 30
        })
    }

    initController() {
        this.controller = new EnemyController(this.scene, {
            component: this,
            speed: 5,
            positionInitial: this.positionInitiale,
            positionFinal: this.positionFinale,
        })
    }

}