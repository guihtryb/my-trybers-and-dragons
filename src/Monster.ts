import { SimpleFighter } from './Fighter';

export default class Monster implements SimpleFighter {
  constructor(
    private _lifePoints: number = 85,
    private readonly _strength: number = 63,
  ) {
  }

  public get lifePoints(): number {
    return this._lifePoints;
  }

  private set lifePoints(value) {
    this._lifePoints = value;
  }

  public get strength(): number {
    return this._strength;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this.strength);
  }

  receiveDamage(attackPoints: number): void | number {
    this.lifePoints -= attackPoints;

    if (this.lifePoints <= 0) this.lifePoints = -1;

    return this.lifePoints;
  }
}