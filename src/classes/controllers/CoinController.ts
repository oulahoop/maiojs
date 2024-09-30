import RAPIER from '@dimforge/rapier2d'
import {FController} from '@fibbojs/2d'
import type { FControllerOptions, FScene } from '@fibbojs/2d'
import Coin from "../blocs/Coin.ts";

export interface CustomControllerOptions extends FControllerOptions {
    component: Coin
}

/**
 * @description Custom controller
 * @category Character
 */
export class CoinController extends FController {
    compteur: number = 0

    component: Coin

    /**
     * The scene where the character is.
     */
    scene: FScene


    /**
     * The character controller that will be used to move the character.
     */
    characterController: RAPIER.KinematicCharacterController

    constructor(scene: FScene, options: CustomControllerOptions) {
        super(options)

        this.component = options.component

        // Store options
        this.scene = scene

        // The gap the controller will leave between the character and its environment
        const offset = 0.01
        // Create the character controller
        this.characterController = scene.world.createCharacterController(offset)
    }

    onFrame(delta: number): void {
        this.compteur += (2 * delta)
        if (this.compteur > 0.75) {
            this.scene.removeComponent(this.component)
        }
        const newPosition = {
            x: this.component.position.x,
            y: this.component.position.y + delta
        }
        this.component.setPosition(newPosition)
        this.component.scaleX -= 5 * delta
    }
}