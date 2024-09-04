import { FSprite } from '@fibbojs/2d'
import { FComponentEmpty, FScene } from '@fibbojs/2d'
import BlocGenerator from "../blocs/BlocGenerator.ts";
import GroundGenerator from "../blocs/GroundGenerator.ts";
import LootBoxGenerator from "../blocs/LootBoxGenerator.ts";

export default class LevelOne {
    private deathZone: FComponentEmpty

    public constructor() {
    }

    public loadLevel(scene: FScene, character: FSprite) {
        this.addDeathZone(scene)
        const blocGenerator = new BlocGenerator(scene, character)
        const groundGenerator = new GroundGenerator(scene, character)
        const lootBoxGenerator = new LootBoxGenerator(scene, character)



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


        character.onCollisionWith(this.deathZone, () => {
            character.setPosition({ x: 0, y: 5 })
        })
        scene.addComponent(character)
    }

    private addDeathZone(scene: FScene) {
        // Create a death zone
        const deathZone = new FComponentEmpty(scene, {
            position: { x: 0, y: -10 },
            scale: { x: 20, y: 1 },
        })
        deathZone.initCollider()
        scene.addComponent(deathZone)
        this.deathZone = deathZone
    }
}