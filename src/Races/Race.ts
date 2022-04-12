import IRace from '../Interfaces';

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
