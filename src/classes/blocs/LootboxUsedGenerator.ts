import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import Generator from "./Generator.ts";
import Character from "../Character.ts";

export default class LootboxUsedGenerator extends Generator {
    texture = 'lootbox_used.png'

    public constructor(scene: FScene, character: Character) {
        super(scene, character)
    }

    public generate(position: { x: number, y: number }) {
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