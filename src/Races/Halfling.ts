import { ICreature } from '../Interfaces';
import Race from './Race';

export default class Halfling extends Race implements ICreature {
  protected _maxLifePoints = 60;
  private static halflingUnits = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Halfling.increaseHalflingQuantity();
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  private static increaseHalflingQuantity(): void {
    Halfling.validateQuantity(Halfling.halflingUnits, 100);

    Halfling.halflingUnits += 1;
  }

  static createdRacesInstances(): number {
    return Halfling.halflingUnits;
  }

  private static validateQuantity(
    currQuantity: number,
    maxQuantity: number,
  ): Error | void {
    if (currQuantity === maxQuantity) {
      throw new Error('Halfling race has reached maximum quantity');
    }
  }
}
