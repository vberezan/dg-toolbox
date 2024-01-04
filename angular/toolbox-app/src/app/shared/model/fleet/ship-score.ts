import {ResourceScore, ResourceScoreMultiplier} from "../stats/resource-score";

export enum ShipScore {
  FIGHTER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 2000),
  BOMBER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.MINERAL * 4000),
  FRIGATE = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 12000 + ResourceScore.MINERAL * 8000),
  DESTROYER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 40000 + ResourceScore.MINERAL * 40000),
  CRUISER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 120000 + ResourceScore.MINERAL * 60000),
  BATTLESHIP = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 600000 + ResourceScore.MINERAL * 400000),
  INVASION = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 25000 + ResourceScore.MINERAL * 18000),
  HULK = ResourceScoreMultiplier.CIVILIAN * (ResourceScore.METAL * 120000 + ResourceScore.MINERAL * 80000),
  MERCHANT = ResourceScoreMultiplier.CIVILIAN * (ResourceScore.METAL * 48000 + ResourceScore.MINERAL * 32000),
  TRADER = ResourceScoreMultiplier.CIVILIAN * (ResourceScore.METAL * 72000 + ResourceScore.MINERAL * 48000),
  FREIGHTER = ResourceScoreMultiplier.CIVILIAN * (ResourceScore.METAL * 24000 + ResourceScore.MINERAL * 16000),
}
