
export interface DataExtractor {
  extract(dom?: Document): any;
  cleanAfterExtract(): void;
}
