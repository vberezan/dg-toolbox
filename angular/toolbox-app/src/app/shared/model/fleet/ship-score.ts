import {ResourceScore, ResourceScoreMultiplier} from "../stats/resource-score";

export enum ShipScore {
  FIGHTER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 2000),
  BOMBER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.MINERAL * 4000),
  FRIGATE = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 12000 + ResourceScore.MINERAL * 8000),
  DESTROYER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 40000 + ResourceScore.MINERAL * 40000),
  CRUISER = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 120000 + ResourceScore.MINERAL * 60000),
  BATTLESHIP = ResourceScoreMultiplier.WARFLEET * (ResourceScore.METAL * 600000 + ResourceScore.MINERAL * 400000)
}
