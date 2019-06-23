import {Injectable} from "@angular/core";
import {LinkData, WordData} from "../models/list.data";
import {EXAMPLE_1_DATA} from "../models/example1.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }


  public getAllExistingWords(): string[] {
    let data: LinkData[] = EXAMPLE_1_DATA;
    let words1 = data.map(e => e.word1.toLowerCase());
    let words2 = data.map(e => e.word2.toLowerCase());
    let words = words1.concat(words2);
    return words.filter((value, index, self) => {
      return self.indexOf(value) === index
    });
  }

  public doesWordExist(word: string): boolean {
    const words = this.getAllExistingWords();
    return words.findIndex(e => e === word) >= 0;
  }

  public getWordDataOfAllWords(): WordData[] {
    const words = this.getAllExistingWords();
    let wordData: WordData[] = [];
    words.forEach(w => {
      let amount = this.getAllLinksOfWord(w).length;
      wordData.push(
        {
          word: w,
          associationAmount: amount,
        }
      );
    });
    return wordData.sort((a, b) => b.associationAmount - a.associationAmount);
  }

  public getAllLinksOfWord(word: string): LinkData[] {
    let data: LinkData[] = EXAMPLE_1_DATA.sort((a, b) => b.link_strength - a.link_strength);
    return data.filter((e) => e.word1.toLowerCase() === word.toLowerCase()
    || e.word2.toLowerCase() === word.toLowerCase());
  }


}
