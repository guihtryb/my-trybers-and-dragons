import Monster from './Monster';
import getRandomInt from './utils';

export default class Dragon extends Monster {
  constructor(
    lifePoints = 999,
    strength = getRandomInt(100, 200),
  ) {
    super(lifePoints, strength);
  }
}
