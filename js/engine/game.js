class Game {
    constructor(maxFps = 60) {
        this.maxFps       = maxFps;
        this.currentFps   = 0;
        this.currentScene = null;

        this._prevTimestamp = 0;
    }

    // -----------------
    // newScene: Scene
    // -----------------
    changeScene(newScene) {
        this.currentScene = newScene;
    }

    start() {
        requestAnimationFrame(this._loop.bind(this));
    }

    _loop(timestamp) {
        const elapsedTime = (timestamp - this._prevTimestamp) / 1000;
        const accuracy    = 0.9;
        const frameTime   = 1 / this.maxFps * accuracy;
        // 経過時間が短すぎた場合: 何もせず次のフレームに移る => フレームレート制限
        if (elapsedTime <= frameTime) {
            requestAnimationFrame(this._loop.bind(this));
            return;
        }
        
        this.currentScene.update();

        this._prevTimestamp = timestamp;
        this.currentFps = 1 / elapsedTime;
        requestAnimationFrame(this._loop.bind(this));
    }
}