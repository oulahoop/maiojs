import {FScene, FSprite} from '@fibbojs/2d'
import {CoinController} from "../controllers/CoinController.ts";

export default class Coin extends FSprite {

    public constructor(scene: FScene, position: { x: number, y: number }) {
        super(scene,  {
            texture: 'sprites/coin.png',
            position: position,
            scale: {x: 0.85, y: 0.85}
        })

        this.initController()
        this.addToScene()
    }

    initController() {
        this.controller = new CoinController(this.scene, {
            component: this,
        })
    }

    addToScene() {
        this.scene.addComponent(this)
    }
}