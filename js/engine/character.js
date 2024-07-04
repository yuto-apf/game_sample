class Character extends Entity {
    constructor(sprite, mapX, mapY) {
        super(sprite, mapX, mapY);
        this.vmapX = this.vmapY = 0;
        this.speed = 0; // A movement amount per a frame. (map space)
        this._moveAmount = 0.5;   // Smallest unit ov movement. (map space)
    }

    // -------------------------------------------------------------------
    // direction: number  ... 0: Up, 1: Right, 2: Down, 3: Left
    // moveOp:    boolean ... If you want to move myself, it is set true.
    // -------------------------------------------------------------------
    _move(direction, moveOp) {
        if (this.mapX % this._moveAmount === 0 && this.mapY % this._moveAmount === 0) {
            this.vmapX = this.vmapY = 0;
            if (moveOp) {
                if (direction === 0) this.vmapY -= this.speed;
                if (direction === 1) this.vmapX += this.speed;
                if (direction === 2) this.vmapY += this.speed;
                if (direction === 3) this.vmapX -= this.speed;
            }
        }

        this.mapX += this.vmapX;
        this.mapY += this.vmapY;
        console.log(this.mapX)
    }
}

class Player extends Character {
    constructor(sprite, mapX, mapY) {
        super(sprite, mapX, mapY);
        this.isFixed = false;
        this.defaultX = mapX;
        this.defaultY = mapY;

        this.movableArea = 

        this._reachedEdges = new Map();
        this._reachedEdges.set('top',    false);
        this._reachedEdges.set('right',  false);
        this._reachedEdges.set('bottom', false);
        this._reachedEdges.set('left',   false);
            
        // マップ端に行ったことでキャラが動けるようになったあと、defaultXまで戻ったらフィールドの移動に切り替える
        // 自分はフィールドとともに移動しないが、端まで行ったら自分のスピードで移動
    }

    update(canvas) {
        this._move(0, input.isKeyDown('ArrowUp')    && this._reachedEdges.get('top'));
        this._move(1, input.isKeyDown('ArrowRight') && this._reachedEdges.get('right'));
        this._move(2, input.isKeyDown('ArrowDown')  && this._reachedEdges.get('bottom'));
        this._move(3, input.isKeyDown('ArrowLeft')  && this._reachedEdges.get('left'));

        this.render(canvas)
    }
}

class NonPlayer extends Character {
    constructor(sprite, mapX, mapY) {
        super(sprite, mapX, mapY);
        this.isFixed = true;
    }

    // update(canvas) {
    //     this._move(0, input.isKeyDown('ArrowUp'));
    //     this._move(1, input.isKeyDown('ArrowRight'));
    //     this._move(2, input.isKeyDown('ArrowDown'));
    //     this._move(3, input.isKeyDown('ArrowLeft'));

    //     this.render(canvas)
    // }

    // CPUはフィールドとともに移動 + 自分のスピードで移動
}