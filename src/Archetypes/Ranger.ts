import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Ranger extends Archetype {
  private readonly _energyType: EnergyType;
  private static rangerUnits = 0;

  constructor(name: string) {
    super(name);

    Ranger.increaseRangerUnits();

    this._energyType = 'stamina';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Ranger.rangerUnits;
  }

  static increaseRangerUnits(): void {
    Ranger.rangerUnits += 1;
  }

  private static validateQuantity(
    currQuantity: number,
    maxQuantity: number,
  ): Error | void {
    if (currQuantity === maxQuantity) {
      throw new Error('Ranger archetype has reached maximum quantity');
    }
  }
}
