import { FComponentEmpty, FScene } from '@fibbojs/2d'
import BlocGenerator from "../blocs/BlocGenerator.ts";
import GroundGenerator from "../blocs/GroundGenerator.ts";
import LootboxGenerator from "../blocs/LootboxGenerator.ts";
import Character from "../Character.ts";

export default class LevelOne {
    scene: FScene
    character: Character

    public constructor(scene: FScene, character: Character) {
        this.scene = scene
        this.character = character
    }

    public loadLevel() {
        this.addDeathZone()
        const blocGenerator = new BlocGenerator(this.scene, this.character)
        const groundGenerator = new GroundGenerator(this.scene, this.character)
        const lootBoxGenerator = new LootboxGenerator(this.scene, this.character)



        for (let x = 0; x < 70; x++) {
            groundGenerator.generate({ x: x - 5, y: -1 })
            groundGenerator.generate({ x: x - 5, y: -2 })
        }

        lootBoxGenerator.generate({ x: 7, y: 4 })
        lootBoxGenerator.generate({ x: 13, y: 4 })
        lootBoxGenerator.generate({ x: 14, y: 8 })
        lootBoxGenerator.generate({ x: 15, y: 4 })

        blocGenerator.generate({ x: 12, y: 4 })
        blocGenerator.generate({ x: 14, y: 4 })
        blocGenerator.generate({ x: 16, y: 4 })

        this.scene.addComponent(this.character)
    }

    private addDeathZone() {
        // Create a death zone
        const deathZone = new FComponentEmpty(this.scene, {
            position: { x: 0, y: -10 },
            scale: { x: 20, y: 1 },
        })
        deathZone.initCollider()
        this.scene.addComponent(deathZone)

        this.character.onCollisionWith(deathZone, () => {
            this.character.setPosition({ x: 0, y: 5 })
        })
    }
}