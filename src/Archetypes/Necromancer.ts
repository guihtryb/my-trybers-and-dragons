import { EnergyType } from '../Energy';
import Archetype from './Archetype';

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
