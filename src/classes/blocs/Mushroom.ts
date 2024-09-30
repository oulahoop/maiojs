import {FScene, FSprite} from '@fibbojs/2d'
import Character from "../Character.ts";
import {MushroomController} from "../controllers/MushroomController.ts";

export default class Mushroom extends FSprite {
    audio= new Audio('maiojs/assets/sounds/oof.mp3')

    public constructor(scene: FScene, position: { x: number, y: number }) {
        super(scene,  {
            texture: 'sprites/mushroom.png',
            position: {
                x: position.x,
                y: position.y + 0.5
            }
        })

        this.initController()
        this.initSensor({
            'scale': {x: 1, y: 1},
        })

        this.initCollision()
        this.addToScene()
    }

    initController() {
        this.controller = new MushroomController(this.scene, {
            component: this
        })
    }

    initCollision() {
        this.onCollisionWith(Character, ({component}) => {
            this.audio.play()
            const character = component as Character
            this.scene.removeComponent(this)
            character.setScale({x: 1, y: 1.4})
        })
    }

    addToScene() {
        this.scene.addComponent(this)
    }
}