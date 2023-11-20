export class JavascriptRepository {
  private _angularMain: string;
  private _angularRuntime: string;
  private _angularPolyfills: string;
  private _angularStyles: string;
  private _dgtUtils: string;
  private _dgtReplaceShipsImages: string;
  private _dgtReplaceStructuresImages: string;
  private _dgtReplacePlanetsImages: string;
  private _dgtReplaceIconsWithImages: string;
  private _dgtReplaceIconsWithFaIcons: string;
  private _dgtCustomStyling: string;
  private _dgtSetupDgtPlaceholders: string;


  get angularMain(): string {
    return this._angularMain;
  }

  set angularMain(value: string) {
    this._angularMain = value;
  }

  get angularRuntime(): string {
    return this._angularRuntime;
  }

  set angularRuntime(value: string) {
    this._angularRuntime = value;
  }

  get angularPolyfills(): string {
    return this._angularPolyfills;
  }

  set angularPolyfills(value: string) {
    this._angularPolyfills = value;
  }

  get angularStyles(): string {
    return this._angularStyles;
  }

  set angularStyles(value: string) {
    this._angularStyles = value;
  }

  get dgtUtils(): string {
    return this._dgtUtils;
  }

  set dgtUtils(value: string) {
    this._dgtUtils = value;
  }

  get dgtReplaceShipsImages(): string {
    return this._dgtReplaceShipsImages;
  }

  set dgtReplaceShipsImages(value: string) {
    this._dgtReplaceShipsImages = value;
  }

  get dgtReplaceStructuresImages(): string {
    return this._dgtReplaceStructuresImages;
  }

  set dgtReplaceStructuresImages(value: string) {
    this._dgtReplaceStructuresImages = value;
  }

  get dgtReplacePlanetsImages(): string {
    return this._dgtReplacePlanetsImages;
  }

  set dgtReplacePlanetsImages(value: string) {
    this._dgtReplacePlanetsImages = value;
  }

  get dgtReplaceIconsWithImages(): string {
    return this._dgtReplaceIconsWithImages;
  }

  set dgtReplaceIconsWithImages(value: string) {
    this._dgtReplaceIconsWithImages = value;
  }

  get dgtReplaceIconsWithFaIcons(): string {
    return this._dgtReplaceIconsWithFaIcons;
  }

  set dgtReplaceIconsWithFaIcons(value: string) {
    this._dgtReplaceIconsWithFaIcons = value;
  }

  get dgtCustomStyling(): string {
    return this._dgtCustomStyling;
  }

  set dgtCustomStyling(value: string) {
    this._dgtCustomStyling = value;
  }

  get dgtSetupDgtPlaceholders(): string {
    return this._dgtSetupDgtPlaceholders;
  }

  set dgtSetupDgtPlaceholders(value: string) {
    this._dgtSetupDgtPlaceholders = value;
  }

  toJSON(): any {
    return {
      angularMain: this.angularMain,
      angularRuntime: this.angularRuntime,
      angularPolyfills: this.angularPolyfills,
      angularStyles: this.angularStyles,
      dgtUtils: this.dgtUtils,
      dgtReplaceShipsImages: this.dgtReplaceShipsImages,
      dgtReplaceStructuresImages: this.dgtReplaceStructuresImages,
      dgtReplacePlanetsImages: this.dgtReplacePlanetsImages,
      dgtReplaceIconsWithImages: this.dgtReplaceIconsWithImages,
      dgtReplaceIconsWithFaIcons: this.dgtReplaceIconsWithFaIcons,
      dgtCustomStyling: this.dgtCustomStyling,
      dgtSetupDgtPlaceholders: this.dgtSetupDgtPlaceholders
    };
  }
}
