import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(
    protected player1: Fighter,
    protected player2: Fighter,
  ) {
    super(player1);
  }

  fight(): number {
    let player1Won = 0;
    let player2Won = 0;

    while (player1Won === 0 && player2Won === 0) {
      this.player1.special(this.player2);

      this.player1.levelUp();

      player1Won = PVP.verifiesPlayerAttackResult(this.player2);

      if (player1Won === 0) {
        this.player2.special(this.player1);

        this.player2.levelUp();

        player2Won = PVP.verifiesPlayerAttackResult(this.player1);
      }
    }

    return player1Won === 1 ? 1 : -1;
  }

  private static verifiesPlayerAttackResult(player: Fighter): number {
    if (player.lifePoints === -1) return 1;
    return 0;
  }

  private showFightResult(value: number): void {
    if (value === 1) {
      console.log(`Player 1 wins with ${this.player1.lifePoints} life points!`);
      return;
    }

    if (value === -1) {
      console.log(`Player 2 wins with ${this.player2.lifePoints} life points!`);
      return;
    }

    console.log(
      'Player1 survived with ',
      this.player1.lifePoints,
      'life points',
      '\n----------------\n',
      'Player2 survived ',
      this.player2.lifePoints,
      'life points',
    );
  }

  private getAttackerAndDefenser() {
    const players = [this.player1, this.player2];

    const attackIndex = Math.random() > 0.5 ? 1 : 0;

    const defenseIndex = attackIndex === 1 ? 0 : 1;

    const playerAttacking = players[attackIndex];

    const playerDefending = players[defenseIndex];

    return [playerAttacking, playerDefending];
  }
}
