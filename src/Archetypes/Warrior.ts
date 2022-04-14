import { EnergyType } from '../Interfaces/Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private readonly _energyType: EnergyType;
  private static warriorUnits = 0;

  constructor(name: string) {
    super(name);

    Warrior.increaseWarriorUnits();

    this._energyType = 'stamina';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Warrior.warriorUnits;
  }

  static increaseWarriorUnits(): void {
    Warrior.warriorUnits += 1;
  }

  private static validateQuantity(
    currQuantity: number,
    maxQuantity: number,
  ): Error | void {
    if (currQuantity === maxQuantity) {
      throw new Error('Warrior archetype has reached maximum quantity');
    }
  }
}
