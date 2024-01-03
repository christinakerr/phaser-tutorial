import Phaser from 'phaser'

import GameScene from './game'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 600,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			debug: true
		},
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)
