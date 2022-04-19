import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  private _environment: SimpleFighter[] = [];

  constructor(
    private _fighter: Fighter,
    environment: SimpleFighter[],
  ) {
    super(_fighter);
    if (!environment.length) {
      this._environment.push(new Monster());
    }
    this._environment = environment;
  }

  public get fighter(): Fighter {
    return this._fighter;
  }

  public get environment(): SimpleFighter[] {
    return this._environment;
  }

  public fight(): number {
    let playerWon = 0;
    let environmentWon = 0;

    while (playerWon === 0 && environmentWon === 0) {
      this.fighterTurn();

      this.fighter.levelUp();

      playerWon = this.verifiesFighterAttackResult();

      if (playerWon === 0) {
        this.environmentTurn();
        
        environmentWon = this.verifiesEnvironmentAttackResult();
      }
    }

    return environmentWon === -1 ? -1 : 1;
  }

  private fighterTurn(): void {
    this.environment.forEach((being) => this.fighter.attack(being));
  }

  private environmentTurn(): void {
    this.environment.forEach((being) => {
      being.attack(this.fighter);
    });
  }

  private verifiesFighterAttackResult(): number {
    const fighterAttacksResult: number[] = this
      .environment.map((being) => (being.lifePoints === -1 ? 1 : 0));

    const countWins = fighterAttacksResult.reduce((a, b) => a + b, 0);

    const playerWon = countWins === this.environment.length;

    if (playerWon) return 1;

    return 0;
  }

  private verifiesEnvironmentAttackResult(): number {
    if (this.fighter.lifePoints === -1) return -1;
    return 0;
  }
}