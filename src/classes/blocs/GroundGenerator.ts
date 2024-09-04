import {FComponentEmpty, FScene, FSprite} from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import Generator from "./Generator.ts";

export default class GroundGenerator extends Generator {
    texture = 'ground.png'

    public constructor(scene: FScene, character: FSprite) {
        super(scene, character)
    }

    public generate(position: { x: number; y: number }): FSprite {
        super.generate(position)
        let ground = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })
        ground.initCollider()
        this.scene.addComponent(ground)
        return ground
    }
}