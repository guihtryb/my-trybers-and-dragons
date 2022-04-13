import { ICreature } from '../Interfaces';
import Race from './Race';

export default class Elf extends Race implements ICreature {
  protected _maxLifePoints = 99;
  private static elfUnits = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Elf.increaseElfQuantity();
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  private static increaseElfQuantity(): void {
    Elf.validateQuantity(Elf.elfUnits, 40);

    Elf.elfUnits += 1;
  }

  static createdRacesInstances(): number {
    return Elf.elfUnits;
  }

  private static validateQuantity(currQuantity:number, maxQuantity:number) {
    if (currQuantity === maxQuantity) {
      throw new Error('Elf race has reached maximum quantity');
    }
  }
}
