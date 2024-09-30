import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import Generator from "./Generator.ts";
import Character from "../Character.ts";

export default class TubeGenerator extends Generator {
    texture = 'sprites/tube.png'

    public constructor(scene: FScene, character: Character) {
        super(scene, character)
    }

    public generate(position: { x: number, y: number }, scale: { x: number, y: number }) {
        super.generate(position, scale)
        let tube = new FSprite(this.scene, {
            texture: this.texture,
            position,
            scale: {x: 1, y: 1}
        })


        tube.initCollider()

        tube.initSensor({
            'scale': {x: scale.x + 0.2, y: scale.y},
        })

        this.scene.addComponent(tube)

        tube.onLoaded(() => {
            tube.scaleX = scale.x
            tube.scaleY = scale.y

        })
    }
}