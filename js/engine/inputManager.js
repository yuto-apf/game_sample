class InputManager {
    constructor() {
        this._keys = new Map();

        addEventListener('keydown', (k) => this._keys.set(k.key, true));
        addEventListener('keyup',   (k) => this._keys.set(k.key, false));
    }

    isKeyDown(keyName) {
        return this._keys.has(keyName) ? this._keys.get(keyName) : false;
    }
}

const input = new InputManager();