import { FScene } from '@fibbojs/2d'
import { FSprite } from '@fibbojs/2d'
import LootboxUsedGenerator from "./LootboxUsedGenerator.ts";
import Generator from "./Generator.ts";

export default class LootboxGenerator extends Generator {
    texture = 'lootbox.png'

    public constructor(scene: FScene, character: FSprite) {
        super(scene, character)
    }

    public generate(position: { x: number, y: number }): FSprite {
        super.generate(position)
        let lootbox = new FSprite(this.scene, {
            texture: this.texture,
            position,
        })
        lootbox.initSensor({
            'scale': {x: 0.8, y: 0.2},
            'position': {x: 0, y: -0.5},
        })
        lootbox.initCollider()

        this.character.onCollisionWith(lootbox, () => {
            this.character.controller.yVelocity = 0
            let position = lootbox.position
            this.scene.removeComponent(lootbox)
            const lootboxUsedGenerator = new LootboxUsedGenerator(this.scene, this.character)
            lootboxUsedGenerator.generate(position)
        })

        this.scene.addComponent(lootbox)
    }

}