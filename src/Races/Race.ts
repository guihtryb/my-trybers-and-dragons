import IRace from '../Interfaces';
import { AvailableRace } from '../Types/AvailableRace';
import availableRaces from './AvailableRaces';

export default abstract class Race implements IRace {
  static racesInstances: AvailableRace[] = availableRaces;

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
