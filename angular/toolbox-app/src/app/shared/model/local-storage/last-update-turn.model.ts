export class LastUpdateTurn {
  private _playersRankings: number = 0;
  private _allianceMembers: number = 0;
  private _planets: number = 0;


  get playersRankings(): number {
    return this._playersRankings;
  }

  set playersRankings(value: number) {
    this._playersRankings = value;
  }

  get allianceMembers(): number {
    return this._allianceMembers;
  }

  set allianceMembers(value: number) {
    this._allianceMembers = value;
  }

  get planets(): number {
    return this._planets;
  }

  set planets(value: number) {
    this._planets = value;
  }

  toJSON(): any {
    return {
      playersRankings: this.playersRankings,
      allianceMembers: this.allianceMembers,
      planets: this.planets
    }
  }
}
