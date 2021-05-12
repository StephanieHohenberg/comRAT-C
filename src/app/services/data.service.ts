import {Injectable} from '@angular/core';
import {CommonLinkData, LinkData, WordData} from '../models/list.data';
import {EXAMPLE_1_DATA} from '../models/example1.data';
import {EdgeData, EdgeDataWrapper, GraphData, NodeData, NodeDataWrapper} from '../models/graph.data';
import {APP_COLORS} from '../../app.const';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly colors: string[] = APP_COLORS;
  private readonly DATA: LinkData[] = EXAMPLE_1_DATA;
  private WORDS: string[];

  constructor() {
    this.WORDS = this.extractWords();
  }

  public getWords(): string[] {
    return this.WORDS;
  }

  public getNumberOfWords(): number {
    return this.WORDS.length;
  }

  public doesWordExist(word: string): boolean {
    return this.WORDS.findIndex(e => e === word) >= 0;
  }

  public getNumberOfLinks(): number {
    return this.DATA.length;
  }

  public getWordDataOfAllWords(): WordData[] {
    const wordData: WordData[] = [];
    this.WORDS.forEach(w => {
      const amount = this.getAllLinksOfWord(w).length;
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
    const data: LinkData[] = this.DATA.sort((a, b) => b.link_strength - a.link_strength);
    return data.filter((e) => e.word1.toLowerCase() === word.toLowerCase()
      || e.word2.toLowerCase() === word.toLowerCase());
  }

  public getAllCommonLinksOfWords(words: string[]): CommonLinkData[] {
    const allLinksOfWords: LinkData[][] = [];
    words.forEach(w => {
      allLinksOfWords.push(this.getAllLinksOfWord(w));
    });

    const allCommonLinksOfWords: CommonLinkData[] = [];
    allLinksOfWords[0].forEach(data => {
      const pre: boolean = data.word1.toLowerCase() === words[0].toLowerCase();
      const word = !pre ? data.word1 : data.word2;

      if (words.findIndex(w => w === word) < 0) {
        const indexW2 = allLinksOfWords[1].findIndex(d => d.word1 === word || d.word2 === word);
        const indexW3 = words.length > 2 ? allLinksOfWords[2].findIndex(d => d.word1 === word || d.word2 === word) : undefined;
        let commonLinkData: LinkData[];
        if (indexW2 > -1 && (indexW3 === undefined || indexW3 > -1)) {
          commonLinkData = [data, allLinksOfWords[1][indexW2]];
          if (indexW3 !== undefined && indexW3 > -1) {
            commonLinkData.push(allLinksOfWords[2][indexW3]);
          }

          const mergedLinkData: CommonLinkData = {
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

  public getAllCommonLinksOfWordsUnmerged(words: string[]): LinkData[] {
    const allLinksOfWords: LinkData[][] = [];
    words.forEach(w => {
      allLinksOfWords.push(this.getAllLinksOfWord(w));
    });

    const commonLinkData: LinkData[] = [];

    allLinksOfWords[0].forEach(data => {
      const pre: boolean = data.word1.toLowerCase() === words[0].toLowerCase();
      const word = !pre ? data.word1 : data.word2;

      if (words.findIndex(w => w === word) < 0) {
        const indexW2 = allLinksOfWords[1].findIndex(d => d.word1 === word || d.word2 === word);
        const indexW3 = words.length > 2 ? allLinksOfWords[2].findIndex(d => d.word1 === word || d.word2 === word) : undefined;
        if (indexW2 > -1 && (indexW3 === undefined || indexW3 > -1)) {
          commonLinkData.push(data);
          commonLinkData.push(allLinksOfWords[1][indexW2]);
          if (indexW3 !== undefined && indexW3 > -1) {
            commonLinkData.push(allLinksOfWords[2][indexW3]);
          }
        }
      }
    });

    return commonLinkData;
  }

  public getGraphDataOfWords(words: string[]): GraphData {
    const nodeDataArray: NodeDataWrapper[] = [];
    const edgeDataArray: EdgeDataWrapper[] = [];
    const addedNodeWords: string[] = [];
    const addedEdgeIDs: number[] = [];
    const linkDataArray = this.getLinkDataForGraphData(words);

    // INPUTWORDS TO NODE DATA
    for (let i = 0; i < words.length; i++) {
      const ID = this.WORDS.findIndex(w => w === words[i]);
      const nodeData = new NodeData(ID, words[i]);
      nodeData.colorCode = this.colors[i];
      nodeData.weight = 40;
      nodeDataArray.push({
        data: nodeData
      });
      addedNodeWords.push(words[i]);
    }

    // LINK DATA TO GRAPH DATA
    linkDataArray.forEach(linkData => {
      const IDw1 = this.WORDS.findIndex(w => w === linkData.word1.toLowerCase());
      const IDw2 = this.WORDS.findIndex(w => w === linkData.word2.toLowerCase());
      if (addedNodeWords.findIndex(w => w === linkData.word1) < 0) {
        nodeDataArray.push({
          data: new NodeData(IDw1, linkData.word1)
        });
        addedNodeWords.push(linkData.word1);
      }
      if (addedNodeWords.findIndex(w => w === linkData.word2) < 0) {
        nodeDataArray.push({
          data: new NodeData(IDw2, linkData.word2)
        });
        addedNodeWords.push(linkData.word2);
      }

      if (addedEdgeIDs.findIndex(id => id === linkData.ID) < 0) {
        edgeDataArray.push({
          data: new EdgeData(IDw1, IDw2, linkData.ID, linkData.link_strength)
        });
        addedEdgeIDs.push(linkData.ID);
      }
    });


    return {
      nodes: nodeDataArray,
      edges: edgeDataArray,
    };
  }

  public getGraphDataForExplorationMode(): GraphData {
    const nodeDataArray: NodeDataWrapper[] = [];
    const edgeDataArray: EdgeDataWrapper[] = [];
    const addedNodeWords: string[] = [];
    const linkDataArray = this.DATA;

    // LINK DATA TO GRAPH DATA
    linkDataArray.forEach(linkData => {
      if (this.getAllLinksOfWord(linkData.word1).length > 1 && this.getAllLinksOfWord(linkData.word2).length > 1) {
        const IDw1 = this.WORDS.findIndex(w => w === linkData.word1.toLowerCase());
        const IDw2 = this.WORDS.findIndex(w => w === linkData.word2.toLowerCase());

        if (addedNodeWords.findIndex(w => w === linkData.word1) < 0) {
          nodeDataArray.push({
            data: new NodeData(IDw1, linkData.word1)
          });
          addedNodeWords.push(linkData.word1);
        }
        if (addedNodeWords.findIndex(w => w === linkData.word2) < 0) {
          nodeDataArray.push({
            data: new NodeData(IDw2, linkData.word2)
          });
          addedNodeWords.push(linkData.word2);
        }

        edgeDataArray.push({
          data: new EdgeData(IDw1, IDw2, linkData.ID, linkData.link_strength)
        });
      }
    });

    return {
      nodes: nodeDataArray,
      edges: edgeDataArray,
    };
  }

  private extractWords(): string[] {
    const data: LinkData[] = this.DATA;
    const words1 = data.map(e => e.word1.toLowerCase());
    const words2 = data.map(e => e.word2.toLowerCase());
    const words = words1.concat(words2);
    return words.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  private getLinkDataForGraphData(words: string[]): LinkData[] {
    if (words.length === 0) {
      return []; // this.DATA; // TODO explorationMode
    }

    let linkDataArray = [];
    words.forEach(word => {
      linkDataArray = linkDataArray.concat(this.getAllLinksOfWord(word).splice(0, 3));
    });

    if (words.length > 1) {
      linkDataArray = linkDataArray.concat(this.getAllCommonLinksOfWordsUnmerged(words));
    }

    // TODO: add connecting paths

    return linkDataArray;
  }
}

