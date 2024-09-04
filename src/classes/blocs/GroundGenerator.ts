import {FScene} from '@fibbojs/2d'
import Generator from "./Generator.ts"
import Character from "../Character.ts";

export default class GroundGenerator extends Generator {
    texture = 'ground.png'

    public constructor(scene: FScene, character: Character) {
        super(scene, character)
    }

    public generate(position: { x: number; y: number }) {
        super.generate(position)
        let ground = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })
        ground.initCollider()
        this.scene.addComponent(ground)
    }
}