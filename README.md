<h1 align="center"> Welcome to my Trybers and Dragons Project!</h1>

- This project is an RPG World developed following OOP and SOLID concepts.

## Putting into practice

- The pilars of OOP: Heritage, abstraction, encapsulation and polymorphism;
- The ability to create and use Interface;
- The use of Composition;
- Application of SOLID principles;
- Implementation of Classes, Instances, Attributes, Methods and Objects in TypeScript;


## What was proposed to develop:

- An RPG world composed of Races with unique characteristics and bestial beings without a Race but who can fight.
- It will be possible to have fight between characters and monsters and between characters.
- Some beings have energy and ability to train to the point of having an Archetype, which can be, for example, Warrior, Necromancer or Mage.

## 1st challange

- Create the entity Race, which, although common to many characters, conveys the particularities of each one.

### How I solve:

- Creating an abstract Race.ts Class;
- Creating the private and readonly name and dexterity attributes;
- Creating a static method to count the number of characters created with the extend Class (Race);
 -> The max number of characters of the extended class will be validate;
- Creating an abstract getter for the max life points;

```
export default abstract class Race implements IRace {
  constructor(
    private readonly _name: string,
    private readonly _dexterity: number,
  ) {}
  
  public get dexterity(): number {
    return this._dexterity;
  }

  public get name(): string {
    return this._name;
  }

  static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }

  abstract get maxLifePoints():number;
 }
```
## 2nd challange

- Create the 4 races existing in the T&D World: Dwarf, Elf, Halfling, and Orc.

### How I solve:

- Creating a class that extends the abstract Race to each existing race, using the OOP's inheritance pillar

```
import { ICreature } from '../Interfaces';
import Race from './Race';

export default class Dwarf extends Race implements ICreature {
  protected _maxLifePoints = 80;
  private static dwarfUnits = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Dwarf.increaseDwarfQuantity();
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  private static increaseDwarfQuantity(): void {
    Dwarf.validateQuantity(Dwarf.dwarfUnits, 30);

    Dwarf.dwarfUnits += 1;
  }

  static createdRacesInstances(): number {
    return Dwarf.dwarfUnits;
  }

  private static validateQuantity(currQuantity:number, maxQuantity:number) {
    if (currQuantity === maxQuantity) {
      throw new Error('Dwarf race has reached maximum number');
    }
  }
}

...

```

## 3rd challange

- Create the Energy resource, which makes it possible for beings to walk, swim, climb or fight. The energy used by beings that use magic is called mana, and for others, stamina.

### How I solve:

- Creating the Type EnergyType, that can only be 'stamina' or 'mana';
- Creating the interface Energy, that establishes the type and the amount;

```
export type EnergyType = 'mana' | 'stamina';

export default interface Energy {
  type_: EnergyType;
  amount: number;
}
```

## 4th challange

- Create an 'archetype' entity, which will allow beings of this world to have their special talents, attack power and respective energy cost;

### How I solve:

- Creating an abstract class Archetype, with the 'name', 'special' and 'cost' (for energy) attributes;

```
import { EnergyType } from '../Energy';
import { IArchetype } from '../Interfaces';

export default abstract class Archetype implements IArchetype {
  readonly special: number;
  readonly cost: number;

  constructor(
    readonly name: string,
  ) {
    this.special = 0;
    this.cost = 0;
  }

  static createdArchetypeInstances():number {
    throw new Error('Not implemented');
  }

  abstract get energyType(): EnergyType;
}
```

## 5th challange

- Create Mage, Necromancer, Warrior, Archer entities

### How I solve:

- Creating a class that extends the abstract Archetype class to each existing archetype, using the OOP's inheritance pillar;

```
export default class Necromancer extends Archetype {
  private readonly _energyType: EnergyType;
  private static necromancerUnits = 0;

  constructor(name: string) {
    super(name);

    Necromancer.increaseNecromancerUnits();

    this._energyType = 'mana';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Necromancer.necromancerUnits;
  }

  static increaseNecromancerUnits() {
    Necromancer.validateQuantity(Necromancer.necromancerUnits, 30);

    Necromancer.necromancerUnits += 1;
  }

  private static validateQuantity(currQuantity:number, maxQuantity:number) {
    if (currQuantity === maxQuantity) {
      throw new Error('Necromancer archetype has reached maximum quantity');
    }
  }
}

```
## 6th challange

- Create the ability of the inhabitants to defend themselves or to invent tricks to get rid of fights, confusion and traps, so everyone will be fighters.

### How I solve:

- Creating a SimpleFighter and a Fighter interface with the attributes and methods above;

```
export default interface SimpleFighter {
  lifePoints: number;
  strength: number;
  attack(enemy: SimpleFighter): void;
  receiveDamage(attackPoints: number):void;
}
```
---
```
import Energy from '../Energy';
import SimpleFighter from './SimpleFighter';

export default interface Fighter extends SimpleFighter {
  defense: number;
  energy?: Energy;
  special(enemy: Fighter): void;
  levelUp(): void;
}
```
## 7th challange

- It will be possible to create a character that will receive a race and an archetype and ability to fight.

### How I solve:

- Creating a class Character that implements the Fighter interface;
- Using the OOP' pillar of composition to add a race to the Character;
- Applying some special business rules to the receiveDamage, attack, special and levelUp method:

```
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
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

  attack(enemy: Fighter): void { 
    enemy.receiveDamage(this.strength);
  }

  special(enemy: Fighter): void {
    const power = getRandomInt(1, this.amount + 1);

    for (let index = 0; index < power; index += 1) {
      this.amount -= 1;
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

```
## 8th challange

- Create monsters, bestial creatures that only attack other beings.
