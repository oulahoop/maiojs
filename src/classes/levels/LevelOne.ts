import { FComponentEmpty, FScene } from '@fibbojs/2d'
import GroundGenerator from "../blocs/GroundGenerator.ts";
import LootboxGenerator from "../blocs/LootboxGenerator.ts";
import Character from "../Character.ts";
import TubeGenerator from "../blocs/TubeGenerator.ts";
import BasicEnemy from "../enemy/BasicEnemy.ts";
import Bloc from "../blocs/Bloc.ts";

export default class LevelOne {
    scene: FScene
    character: Character

    public constructor(scene: FScene, character: Character) {
        this.scene = scene
        this.character = character
    }

    public loadLevel() {
        this.addDeathZone()
        const groundGenerator = new GroundGenerator(this.scene, this.character)
        const lootBoxGenerator = new LootboxGenerator(this.scene, this.character)
        const tubeGenerator = new TubeGenerator(this.scene, this.character)


        for (let x = 0; x < 70; x++) {
            groundGenerator.generate({ x: x - 5, y: -1 })
            groundGenerator.generate({ x: x - 5, y: -2 })
        }

        lootBoxGenerator.generate({ x: 7, y: 4 })
        lootBoxGenerator.generate({ x: 13, y: 4 })
        lootBoxGenerator.generate({ x: 14, y: 8 })
        lootBoxGenerator.generate({ x: 15, y: 4 })

        new Bloc(this.scene, { x: 12, y: 4 })
        new Bloc(this.scene, { x: 14, y: 4 })
        new Bloc(this.scene, { x: 16, y: 4 })

        /*
        blocGenerator.generate({ x: 12, y: 4 })
        blocGenerator.generate({ x: 14, y: 4 })
        blocGenerator.generate({ x: 16, y: 4 })
        */

        tubeGenerator.generate({ x: 30, y: 1 }, { x: 3, y: 3})
        tubeGenerator.generate({ x: 38, y: 2 }, { x: 3, y: 5})

        new BasicEnemy(this.scene, { x: 10, y: 0 }, { x: 5, y: 1 })
        new BasicEnemy(this.scene, { x: 13, y: 0 }, { x: 6, y: 1 })
        new BasicEnemy(this.scene, { x: 16, y: 0 }, { x: 7, y: 1 })


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