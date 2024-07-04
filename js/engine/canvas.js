class Canvas {
    // ---------------------------------------------------
    // elm:    HTMLElement ... Target canvas for drawing. 
    // width:  number      ... Canvas's width
    // height: number      ... Canvas's height
    // ---------------------------------------------------
    constructor(elm, width, height) {
        this.canvas = elm;
        this.ctx    = this.canvas.getContext('2d');
        this.width  = width;
        this.height = height;

        this.canvas.width  = width;
        this.canvas.height = height;
    }
}