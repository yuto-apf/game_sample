class Field {
    // --------------------------------------------------------
    // field:     number[]     ... Array of Map data.
    // canvas:    Canvas       ... Target canvas for drawing.
    // sheet:     Image        ... Sprite sheet of field image.
    // pieceSize: number       ... Size of a piece of sprite.
    // --------------------------------------------------------
    constructor(fieldData, canvas, sheet, pieceSize = 32) {
        this.x = this.y = 0;    // Origin of field.(canvas space)
        this.vx = this.vy = 0;
        this.speed = 0;         // A movement amount per a frame. (canvas space)
        // this.player = null;     // player: Player
        this.entities = [];     // entities: Entity[]

        this._data       = fieldData;
        this._width      = fieldData[0].length * pieceSize;
        this._height     = fieldData.length * pieceSize;
        this._canWidth   = canvas.width;
        this._canHeight  = canvas.height;
        this._sheet      = sheet;
        this._pieceSize  = pieceSize;
        this._moveAmount = pieceSize / 2;   // Smallest unit ov movement. (canvas space)
        // this._moveOp     = true;
    }

    // setSpeed(mapMovement) {
    //     this.speed = mapMovement * this._pieceSize / 60;
    // }

    add(entity) {
        entity.setFieldOrigin(this.x, this.y)
        this.entities.push(entity)
    }

    update(canvas) {
        this._move();
        this.render(canvas);

        // this.player.update

        this.entities.forEach((entity) => {
            // Synchronize with field movement.
            if (entity.isFixed) {
                entity.setFieldOrigin(this.x, this.y);
            }
            if (entity instanceof Player) {
                entity._reachedEdges.set('top',    this._isReachedTopEdge());
                entity._reachedEdges.set('right',  this._isReachedRightEdge());
                entity._reachedEdges.set('bottom', this._isReachedBottomEdge());
                entity._reachedEdges.set('left',   this._isReachedLeftEdge());
            }
            entity.update(canvas);
        });
    }

    render(canvas) {
        for (let mapY = 0; mapY < this._data.length; mapY++) {
            const y = this._map2canvas(mapY, this.y);
            // A piece is not drawn, if it stick out from canvas.
            if (y + this._pieceSize < 0 || canvas.height < y) continue;

            for (let mapX = 0; mapX < this._data[mapY].length; mapX++) {
                const x = this._map2canvas(mapX, this.x);
                if (x + this._pieceSize < 0 || canvas.width < x) continue;
                
                const [chipX, chipY] = this._calcSpriteChipCoord(this._data[mapY][mapX]);
                canvas.ctx.drawImage(
                    this._sheet,
                    this._pieceSize * chipX, this._pieceSize * chipY,
                    this._pieceSize, this._pieceSize,
                    x, y,
                    this._pieceSize, this._pieceSize
                );
            }
        }
    }

    // -----------------------------------------------------
    // grid: number ... It shows how many grid are shifted.
    // -----------------------------------------------------
    shiftX(grid) {
        const shiftAmount = grid * this._pieceSize;
        const newX = this.x + shiftAmount;
        if (shiftAmount % this._moveAmount !== 0 || newX > 0) return;

        this.x = newX;        
    }

    shiftY(grid) {
        const shiftAmount = grid * this._pieceSize;
        const newY = this.y + shiftAmount;
        if (shiftAmount % this._moveAmount !== 0 || newY > 0) return;

        this.y = newY;        
    }

    _move() {
        if (this.x % this._moveAmount === 0 && this.y % this._moveAmount === 0) {
            this.vx = this.vy = 0;
            if (input.isKeyDown('ArrowUp')    && !this._isReachedTopEdge())    this.vy += this.speed;
            if (input.isKeyDown('ArrowDown')  && !this._isReachedBottomEdge()) this.vy -= this.speed;
            if (input.isKeyDown('ArrowRight') && !this._isReachedRightEdge())  this.vx -= this.speed;
            if (input.isKeyDown('ArrowLeft')  && !this._isReachedLeftEdge())   this.vx += this.speed;
        }
    
        this.x += this.vx;
        this.y += this.vy;
    }

    _isReachedTopEdge() {
        return this.y === 0;
    }

    _isReachedBottomEdge() {
        return this.y === this._canHeight - this._height;
    }

    _isReachedRightEdge() {
        return this.x === this._canWidth - this._width;
    }

    _isReachedLeftEdge() {
        return this.x === 0;
    }

    // ---------------------------------------------------------
    // Calc a coordinate in canvas space.
    // mapCoord:    number ... Coordinates in map's space.
    // fieldOrigin: number ... Origin of field.(canvas's space)
    // ---------------------------------------------------------
    _map2canvas(mapCoord, fieldOrigin) {
        return mapCoord * this._pieceSize + fieldOrigin;
    }    

    // -----------------------------------------------------
    // Calc a coordinate in sprite-chip space.
    // chipNum: number ... Sprite-chip's continuous number.
    // -----------------------------------------------------
    _calcSpriteChipCoord(chipNum) {
        const t = this._sheet.width / this._pieceSize;
        const chipX = chipNum % t;
        const chipY = ~~(chipNum / t);

        return [chipX, chipY];
    }
}