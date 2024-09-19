import RAPIER from '@dimforge/rapier2d'
import {FController, FShapes} from '@fibbojs/2d'
import type { FControllerOptions, FScene } from '@fibbojs/2d'
import BasicEnemy from "../enemy/BasicEnemy.ts";

export interface CustomControllerOptions extends FControllerOptions {
    /**
     * The speed of the character.
     */
    speed?: number

    positionInitial: { x: number, y: number }

    positionFinal: { x: number, y: number }

    component: BasicEnemy
}

/**
 * @description Custom controller
 * @category Character
 */
export class EnemyController extends FController {
    /**
     * The speed of the character.
     */
    speed: number

    positionInitial: { x: number, y: number }

    positionFinal: { x: number, y: number }

    compteur: number = 0

    component: BasicEnemy

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

        this.positionInitial = options.positionInitial
        this.positionFinal = options.positionFinal

        // Define default values
        const DEFAULT_OPTIONS = {
            speed: options.speed,
        }

        // Apply default options
        options = { ...DEFAULT_OPTIONS, ...options }
        // Validate options
        if (!options.speed)
            throw new Error('FibboError: FCharacter requires speed option')

        // Store options
        this.scene = scene
        this.speed = options.speed


        // The gap the controller will leave between the character and its environment
        const offset = 0.01
        // Create the character controller
        this.characterController = scene.world.createCharacterController(offset)

        // Initialize a sensor
        this.component.initSensor({
            shape: FShapes.SQUARE,
            scale: { x: 1, y: 1 },
        })
    }

    onFrame(delta: number): void {
        // Get the corrected movement
        const mouvement = Math.sin(this.compteur)
        this.compteur += delta

        this.component.setPosition({
            x: this.component.position.x + mouvement * delta * this.speed,
            y: this.component.position.y
        })
        this.component.sensor?.rigidBody.setTranslation({ x: this.component.position.x, y: this.component.position.y }, true)

        this.component.topSensor.sensor?.rigidBody.setTranslation({ x: this.component.position.x, y: this.component.position.y + 0.5 }, true)
    }
}