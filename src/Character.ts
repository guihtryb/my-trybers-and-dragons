import Archetype, { Mage } from './Archetypes';
import Energy from './Interfaces/Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private readonly _race: Race;
  private readonly _archetype: Archetype;
  private maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _level: number;

  constructor(
    private _name: string,
    characterRace: Race = new Elf(_name, 10),
    characterArchetype: Archetype = new Mage(_name),
  ) {
    this._race = characterRace;
    this._archetype = characterArchetype;
    this.maxLifePoints = this.race.maxLifePoints / 2;
    this._lifePoints = this.maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = this.race.dexterity;
    this._energy = {
      type_: this.archetype.energyType,
      amount: getRandomInt(1, 10),
    };
    this._level = 1;
  }

  public get race(): Race {
    return this._race;
  }

  public get archetype(): Archetype {
    return this._archetype;
  }

  public get name(): string {
    return this._name;
  }

  public get level(): number {
    return this._level;
  }

  private set level(value: number) {
    this._level = value;
  }

  public get lifePoints(): number {
    return this._lifePoints;
  }

  private set lifePoints(value: number) {
    this._lifePoints = value;
  }

  public get strength(): number {
    return this._strength;
  }

  private set strength(value: number) {
    this._strength = value;
  }

  public get defense(): number {
    return this._defense;
  }

  private set defense(value: number) {
    this._defense = value;
  }

  public get dexterity(): number {
    return this._dexterity;
  }

  private set dexterity(value: number) {
    this._dexterity = value;
  }

  public get energy(): Energy {
    return { ...this._energy };
  }

  private set amount(value: number) {
    this._energy.amount = value;
  }

  attack(enemy: SimpleFighter): void { 
    enemy.receiveDamage(this.strength);
  }

  special(enemy: SimpleFighter): void {
    const power = getRandomInt(1, this.energy.amount + 1);
 
    for (let index = 0; index < power; index += 1) {
      this.amount = this.energy.amount - 1;
 
      const powerAttack = this.strength + getRandomInt(this.level * 2, 100);
 
      enemy.receiveDamage(powerAttack);
    }
  }

  levelUp(): void {
    const newMaxLifePoints = this.validateNewMaxLifePoints(
      this.maxLifePoints + getRandomInt(1, 10),
    );

    this.strength += getRandomInt(1, 10);
    
    this.dexterity += getRandomInt(1, 10);
    
    this.defense += getRandomInt(1, 10);
    
    this.maxLifePoints = newMaxLifePoints;
    
    this.amount = 10;

    this.lifePoints = newMaxLifePoints;

    this.level += 1;
  }

  private validateNewMaxLifePoints(value: number): number {
    if (value > this.race.maxLifePoints) {
      return this.race.maxLifePoints;
    } 
    return value;
  }

  receiveDamage(attackPoints: number): void | number {
    const damage = attackPoints - this.defense;

    if (damage > 0) this.lifePoints -= damage;

    if (this.lifePoints <= 0) this.lifePoints = -1;

    return this.lifePoints;
  }
}
