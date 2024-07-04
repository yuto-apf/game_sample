// class mainCharacter extends Entity {
//     constructor() {
//         const cat = new Sprite(assets.get('cat'), new Rectangle(0, 0, 32, 32));
//         super(cat, 5, 5);
//     }
// }

class MainScene extends Scene {
    constructor(canvas) {
        super(canvas, 'Main scene');

        const field = new Field(fieldData.ex1, canvas, assets.get('tile'));
        field.speed = 4;
        field.shiftX(-4);
        field.shiftY(-2);

        const tableLeft  = new Sprite(assets.get('woods'), new Rectangle(0, 0, 32, 32));
        const tableRight = new Sprite(assets.get('woods'), new Rectangle(0, 32, 32, 32));
        for (let i = 5; i < 10; i++) {
            field.add(new Furniture(tableLeft, i, 7));
        }
        field.add(new Furniture(tableRight, 10, 7));

        const cat = new Sprite(assets.get('cat'), new Rectangle(0, 0, 32, 32));
        const player = new Player(cat, 7, 4);
        player.speed = 0.03125;
        field.add(player);
        // field.player = player;

        this.field = field;
    }
}


window.onload = async () => {
    const can = document.getElementById('can');
    const mainCanvas = new Canvas(can, CAN_WIDTH, CAN_HEIGHT);

    assets.addImage('tile',   './img/tile.png');
    assets.addImage('woods',   './img/woods.png');
    assets.addImage('cat', './img/cat.png');
    await assets.loadAllAssets();

    const game  = new Game();
    const scene = new MainScene(mainCanvas);
    
    game.changeScene(scene);
    game.start();
}