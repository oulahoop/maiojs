import RAPIER from '@dimforge/rapier2d'
import {FController, FShapes, FSprite} from '@fibbojs/2d'
import type { FControllerOptions, FScene } from '@fibbojs/2d'
import Mushroom from "../blocs/Mushroom.ts";

export interface CustomControllerOptions extends FControllerOptions {
    component: Mushroom
}

/**
 * @description Custom controller
 * @category Character
 */
export class MushroomController extends FController {

    yVelocity: number = -30

    component: Mushroom

    direction: number = 1

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

        // Initialize the rigid body
        this.component.initRigidBody({
            rigidBodyType: RAPIER.RigidBodyType.KinematicPositionBased,
            lockRotations: true,
            ...options,
        })

        // Initialize a sensor
        this.component.initSensor({
            shape: FShapes.SQUARE,
            scale: { x: 1, y: 1 },
        })

        this.component.onCollisionWith(FSprite, () => {
            this.direction *= -1
        })
    }
    getCorrectedMovements(delta: number): { x: number, y: number } {
        const movementDirection = new RAPIER.Vector2(0, 0)
        // Compute the movement direction
        movementDirection.x = this.direction

        // Create movement vector
        const desiredMovement = {
            x: movementDirection.x * 8 * 0.01,
            y: this.yVelocity * 0.01,
        }

        // Compute the desired movement
        this.characterController.computeColliderMovement(
            this.component.collider?.collider as RAPIER.Collider,
            desiredMovement,
            RAPIER.QueryFilterFlags.EXCLUDE_SENSORS,
        )

        // Apply gravity
        if (this.yVelocity > this.scene.world.gravity.y) {
            this.yVelocity += this.scene.world.gravity.y * delta * 11
        }
        else {
            this.yVelocity = this.scene.world.gravity.y
        }

        // Get the corrected movement
        return this.characterController.computedMovement()
    }

    onFrame(delta: number): void {
        // Get the corrected movement
        const correctedMovement = this.getCorrectedMovements(delta)

        // Apply the movement to the rigid body
        this.component.rigidBody?.rigidBody.setNextKinematicTranslation({
            x: this.component.rigidBody.rigidBody.translation().x + correctedMovement.x * delta * 64,
            y: this.component.rigidBody.rigidBody.translation().y + correctedMovement.y * delta * 64,
        })
    }
}