import { FCamera, FComponent, FScene } from '@fibbojs/2d'

export interface CameraOptions {
    constY: number
    target: FComponent
    zoom: number
}

export class Camera extends FCamera {
    target: FComponent
    constY: number
    zoom: number

    constructor(scene: FScene, options: CameraOptions) {
        super(scene)
        this.target = options.target
        this.constY = options.constY || 0
        this.zoom = options.zoom || 1
    }

    onFrame(_delta: number): void {
        // Move the camera to the target
        this.scene.viewport.moveCenter(
            this.target.transform.position.x * 100 + this.position.x * 100,
            this.constY * 100
        )
    }

    __ON_CAMERA_ADDED_TO_SCENE_PLEASE_DO_NOT_CALL_THIS_BY_HAND__(): void {
        // Disable all plugins on the pixi viewport
        this.scene.viewport.plugins.pause('drag')
        this.scene.viewport.plugins.pause('pinch')
        this.scene.viewport.plugins.pause('wheel')
        this.scene.viewport.plugins.pause('decelerate')
    }



}