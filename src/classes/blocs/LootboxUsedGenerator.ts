import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import Generator from "./Generator.ts";

export default class LootboxUsedGenerator extends Generator {
    texture = 'lootbox_used.png'

    public constructor(scene: FScene, character: FSprite) {
        super(scene, character)
    }

    public generate(position: { x: number, y: number }): FSprite {
        let lootboxUsed = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })
        lootboxUsed.initCollider()

        lootboxUsed.onCollisionWith(this.character, () => {
            this.character.controller.yVelocity = 0
        });

        this.scene.addComponent(lootboxUsed)
    }

}