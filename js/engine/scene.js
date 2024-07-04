class Scene {
    // ----------------------------------------------------
    // canvas:    Canvas   ... Target canvas for drawing.
    // name:      string   ... Scene's name.
    // ----------------------------------------------------
    constructor(canvas, name) {
        this.canvas   = canvas;
        this.name     = name;
        this.field    = null;   // field: Field | null
    }

    update() {
        this.field.update(this.canvas);
    }
}