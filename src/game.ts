import Phaser from 'phaser';
import PlayerController from './player-controller';

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private penguin?: Phaser.Physics.Matter.Sprite;

    private playerController?: PlayerController;
    isTouchingGround = false;

    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    preload() {
        this.load.atlas('penguin', 'assets/penguin.png', 'assets/penguin.json');
        this.load.image('tiles', 'assets/sheet.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/game.json');
    }

    create() {
        // const { width, height } = this.scale;

        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('iceworld', 'tiles');

        const ground = map.createLayer('ground', tileset);
        ground.setCollisionByProperty({ collides: true });

        const objectsLayer = map.getObjectLayer('objects');
        objectsLayer.objects.forEach((objData) => {
            const { x, y, name, width } = objData;
            switch (name) {
                case 'penguin-spawn': {
                    this.penguin = this.matter.add
                        .sprite(x + width * 0.5, y, 'penguin')
                        .play('player-idle')
                        .setFixedRotation();

                    this.playerController = new PlayerController(
                        this.penguin,
                        this.cursors
                    );

                    this.penguin.setOnCollide((data) => {
                        this.isTouchingGround = true;
                    });
                    this.cameras.main.startFollow(this.penguin);
                    break;
                }
            }
        });

        this.matter.world.convertTilemapLayer(ground);
    }

    update(t: number, dt: number) {
        if (!this.playerController) {
            return;
        }

        this.playerController.update(dt);
    }
}
