import {Injectable} from "@angular/core";
import {CommonLinkData, LinkData, WordData} from "../models/list.data";
import {EXAMPLE_1_DATA} from "../models/example1.data";
import {EdgeData, EdgeDataWrapper, GraphData, NodeData, NodeDataWrapper} from "../models/graph.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DATA: LinkData[] = EXAMPLE_1_DATA;
  public colors: string[] = ['#3aafa9', '#9E379F', '#ff8000'];

  constructor() {
  }


  public getAllExistingWords(): string[] {
    let data: LinkData[] = this.DATA;
    let words1 = data.map(e => e.word1.toLowerCase());
    let words2 = data.map(e => e.word2.toLowerCase());
    let words = words1.concat(words2);
    return words.filter((value, index, self) => {
      return self.indexOf(value) === index
    });
  }

  public getNumberOfWords(): number {
    return this.getAllExistingWords().length;
  }

  public getNumberOfLinks(): number {
    return this.DATA.length;
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
    let data: LinkData[] = this.DATA.sort((a, b) => b.link_strength - a.link_strength);
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


  public getAllCommonLinksOfWordsUnmerged(words: string[]): LinkData[] {
    let allLinksOfWords: LinkData[][] = [];
    words.forEach(w => {
      allLinksOfWords.push(this.getAllLinksOfWord(w));
    });

    let commonLinkData: LinkData[] = [];

    allLinksOfWords[0].forEach(data => {
      let pre: boolean = data.word1.toLowerCase() === words[0].toLowerCase();
      let word = !pre ? data.word1 : data.word2;

      if (words.findIndex(w => w === word) < 0) {
        let indexW2 = allLinksOfWords[1].findIndex(d => d.word1 === word || d.word2 === word);
        let indexW3 = words.length > 2 ? allLinksOfWords[2].findIndex(d => d.word1 === word || d.word2 === word) : undefined;
        if (indexW2 > -1 && (indexW3 === undefined || indexW3 > -1)) {
          commonLinkData.push(data);
          commonLinkData.push(allLinksOfWords[1][indexW2]);
          if (indexW3 != undefined && indexW3 > -1) {
            commonLinkData.push(allLinksOfWords[2][indexW3]);
          }
        }
      }
    });

    return commonLinkData;
  }


  private getLinkDataForGraphData(words: string[]): LinkData[] {
    if (words.length === 0) {
      return [] //this.DATA; //TODO explorationMode
    }

    let linkDataArray = [];
    words.forEach(word => {
      linkDataArray = linkDataArray.concat(this.getAllLinksOfWord(word).splice(0, 3));
    });

    if (words.length > 1) {
      linkDataArray = linkDataArray.concat(this.getAllCommonLinksOfWordsUnmerged(words));
    }

    //TODO: add connecting paths

    return linkDataArray;
  }


  public getGraphDataOfWords(words: string[]): GraphData {
    let nodeDataArray: NodeDataWrapper[] = [];
    let edgeDataArray: EdgeDataWrapper[] = [];
    let addedNodeWords: string[] = [];
    let addedEdgeIDs: number[] = [];
    let linkDataArray = this.getLinkDataForGraphData(words);

    //INPUTWORDS TO NODE DATA
    for (let i = 0; i < words.length; i++) {
      let ID = this.getAllExistingWords().findIndex(w => w === words[i]);
      let nodeData = new NodeData(ID, words[i]);
      nodeData.colorCode = this.colors[i];
      nodeData.weight = 40;
      nodeDataArray.push({
        data: nodeData
      });
      addedNodeWords.push(words[i]);
    }

    //LINK DATA TO GRAPH DATA
    linkDataArray.forEach(linkData => {
      let IDw1 = this.getAllExistingWords().findIndex(w => w === linkData.word1.toLowerCase());
      let IDw2 = this.getAllExistingWords().findIndex(w => w === linkData.word2.toLowerCase());
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
    let nodeDataArray: NodeDataWrapper[] = [];
    let edgeDataArray: EdgeDataWrapper[] = [];
    let addedNodeWords: string[] = [];
    let linkDataArray = this.DATA;

    //LINK DATA TO GRAPH DATA
    linkDataArray.forEach(linkData => {
      if (this.getAllLinksOfWord(linkData.word1).length > 1 && this.getAllLinksOfWord(linkData.word2).length > 1) {
        let IDw1 = this.getAllExistingWords().findIndex(w => w === linkData.word1.toLowerCase());
        let IDw2 = this.getAllExistingWords().findIndex(w => w === linkData.word2.toLowerCase());

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
        })
      }
    });


    return {
      nodes: nodeDataArray,
      edges: edgeDataArray,
    };
  }

}
