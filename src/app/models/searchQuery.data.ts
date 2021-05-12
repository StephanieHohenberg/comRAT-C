export class SearchQuery {
  public timestamp: Date;
  public words: string[] = [];

  constructor(words: string[]) {
    this.words = [...words];
    this.timestamp = new Date();
  }
}
