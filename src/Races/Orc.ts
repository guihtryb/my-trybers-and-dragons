import { ICreature } from '../Interfaces';
import Race from './Race';

export default class Orc extends Race implements ICreature {
  protected _maxLifePoints = 74;
  private static orcUnits = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Orc.increaseOrcQuantity();
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  private static increaseOrcQuantity(): void {
    Orc.validateQuantity(Orc.orcUnits, 30);

    Orc.orcUnits += 1;
  }

  static createdRacesInstances(): number {
    return Orc.orcUnits;
  }

  private static validateQuantity(currQuantity:number, maxQuantity:number) {
    if (currQuantity === maxQuantity) {
      throw new Error('Orc race has reached maximum number');
    }
  }
}
