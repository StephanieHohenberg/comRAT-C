import {Injectable} from "@angular/core";
import {CommonLinkData, LinkData, WordData} from "../models/list.data";
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

  public getAllCommonLinksOfWords(words: string[]): CommonLinkData[] {
    let allLinksOfWords: LinkData[][] = [];
    words.forEach(w => {
      allLinksOfWords.push(this.getAllLinksOfWord(w));
    });

    let allCommonLinksOfWords: CommonLinkData[] = [];
    allLinksOfWords[0].forEach(data => {
      let pre: boolean = data.word1.toLowerCase() === words[0].toLowerCase();
      let word = !pre ? data.word1 : data.word2;

      if (words.findIndex(w => w === word) < 0) {
        let indexW2 = allLinksOfWords[1].findIndex(d => d.word1 === word || d.word2 === word);
        let indexW3 = words.length > 2 ? allLinksOfWords[2].findIndex(d => d.word1 === word || d.word2 === word) : undefined;
        let commonLinkData: LinkData[];
        if (indexW2 > -1 && (indexW3 === undefined || indexW3 > -1)) {
          commonLinkData = [data, allLinksOfWords[1][indexW2]];
          if (indexW3 != undefined && indexW3 > -1) {
            commonLinkData.push(allLinksOfWords[2][indexW3]);
          }

          let mergedLinkData: CommonLinkData = {
            word: word,
            link_strength: commonLinkData.map(d => d.link_strength),
            ID: commonLinkData.map(d => d.ID)
          };
          allCommonLinksOfWords.push(mergedLinkData);
        }
      }
    });

    return allCommonLinksOfWords;
  }


}
