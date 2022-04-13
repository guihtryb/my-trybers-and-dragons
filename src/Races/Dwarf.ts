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
      throw new Error('Dwarf race has reached maximum quantity');
    }
  }
}
