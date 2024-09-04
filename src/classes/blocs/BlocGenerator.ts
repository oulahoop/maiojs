import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import Generator from "./Generator.ts";

export default class BlocGenerator extends Generator {
    texture = 'bloc.png'

    public constructor(scene: FScene, character: FSprite) {
        super(scene, character)
    }

    public generate(position: { x: number, y: number }): FSprite {
        super.generate(position)
        let bloc = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })

        bloc.initCollider()
        bloc.initSensor({
            'scale': {x: 0.8, y: 0.2},
            'position': {x: 0, y: -0.5},
        })

        this.character.onCollisionWith(bloc, () => {
            this.character.controller.yVelocity = 0
            bloc.scene.removeComponent(bloc)
        })

        this.scene.addComponent(bloc)
        return bloc
    }
}