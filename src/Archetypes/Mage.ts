import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  private readonly _energyType: EnergyType;
  private static mageUnits = 0;

  constructor(name: string) {
    super(name);

    Mage.increaseMageUnits();

    this._energyType = 'mana';
  }

  get energyType(): EnergyType {
    return this._energyType;
  }

  static createdArchetypeInstances(): number {
    return Mage.mageUnits;
  }

  static increaseMageUnits() {
    Mage.validateQuantity(Mage.mageUnits, 30);

    Mage.mageUnits += 1;
  }

  private static validateQuantity(currQuantity:number, maxQuantity:number) {
    if (currQuantity === maxQuantity) {
      throw new Error('Mage archetype has reached maximum quantity');
    }
  }
}
