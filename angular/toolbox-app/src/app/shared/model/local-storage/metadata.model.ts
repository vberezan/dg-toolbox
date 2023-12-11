import {UpdateMetadata} from "../stats/update-metadata.model";

export class Metadata {
  private _dgtVersion: string;
  private _rankingsTurn: UpdateMetadata;
  private _allianceMembersTurn: UpdateMetadata;
  private _planetsTurn: UpdateMetadata;


  get dgtVersion(): string {
    return this._dgtVersion;
  }

  set dgtVersion(value: string) {
    this._dgtVersion = value;
  }

  get rankingsTurn(): UpdateMetadata {
    return this._rankingsTurn;
  }

  set rankingsTurn(value: UpdateMetadata) {
    this._rankingsTurn = value;
  }

  get allianceMembersTurn(): UpdateMetadata {
    return this._allianceMembersTurn;
  }

  set allianceMembersTurn(value: UpdateMetadata) {
    this._allianceMembersTurn = value;
  }

  get planetsTurn(): UpdateMetadata {
    return this._planetsTurn;
  }

  set planetsTurn(value: UpdateMetadata) {
    this._planetsTurn = value;
  }

  toJSON(): any {
    return {
      dgtVersion: this.dgtVersion,
      playersRankingsTurn: this.rankingsTurn,
      planetsTurn: this.planetsTurn
    }
  }
}
