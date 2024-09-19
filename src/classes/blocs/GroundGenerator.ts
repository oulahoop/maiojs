import {FScene} from '@fibbojs/2d'
import {FSprite} from '@fibbojs/2d'
import Generator from "./Generator.ts"
import Character from "../Character.ts";

export default class GroundGenerator extends Generator {
    texture = 'ground.png'

    public constructor(scene: FScene, character: Character) {
        super(scene, character)
    }

    public generate(position: { x: number; y: number }) {
        // Initialise le secret sensor pour recuperer le jump
        super.generate(position)

        // Cree le sol
        let ground = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })
        ground.initCollider()
        this.scene.addComponent(ground)
    }
}