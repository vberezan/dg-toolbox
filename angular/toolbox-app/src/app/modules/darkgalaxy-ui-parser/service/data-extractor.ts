
export interface DataExtractor {
  extract(): any;
  cleanAfterExtract(): void;
}
