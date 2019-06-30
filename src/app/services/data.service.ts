import {Injectable} from "@angular/core";
import {CommonLinkData, LinkData, WordData} from "../models/list.data";
import {EXAMPLE_1_DATA} from "../models/example1.data";
import {EdgeData, EdgeDataWrapper, GraphData, NodeData, NodeDataWrapper} from "../models/graph.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private DATA: LinkData[] = EXAMPLE_1_DATA;
  private colors: string[] = ['#3aafa9', '#de0f3f', '#ffbd4a'];

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
    let graphNodeWords = [];
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
      graphNodeWords.push(words[i]);
    }

    //LINK DATA TO GRAPH DATA
    linkDataArray.forEach(linkData => {
      let IDw1 = this.getAllExistingWords().findIndex(w => w === linkData.word1.toLowerCase());
      let IDw2 = this.getAllExistingWords().findIndex(w => w === linkData.word2.toLowerCase());
      if (graphNodeWords.findIndex(w => w === linkData.word1) < 0) {
        nodeDataArray.push({
          data: new NodeData(IDw1, linkData.word1)
        });
        graphNodeWords.push(linkData.word1);
      }
      if (graphNodeWords.findIndex(w => w === linkData.word2) < 0) {
        nodeDataArray.push({
          data: new NodeData(IDw2, linkData.word2)
        });
        graphNodeWords.push(linkData.word2);
      }

      edgeDataArray.push({
        data: new EdgeData(IDw1, IDw2, linkData.ID, linkData.link_strength)
      })
    });


    return {
      nodes: nodeDataArray,
      edges: edgeDataArray,
    };
    /**
     return graphData = {
      nodes: [
        {data: {id: 'a', name: 'Signup', weight: 100, colorCode: 'blue', shapeType: 'roundrectangle'}},
        {data: {id: 'b', name: 'User Profile', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle'}},
        {data: {id: 'c', name: 'Billing', weight: 100, colorCode: 'magenta', shapeType: 'roundrectangle'}},
        {data: {id: 'd', name: 'Sales', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle'}},
        {data: {id: 'e', name: 'Referral', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle'}},
        {data: {id: 'f', name: 'Loan', weight: 100, colorCode: 'orange', shapeType: 'roundrectangle'}},
        {data: {id: 'j', name: 'Support', weight: 100, colorCode: 'red', shapeType: 'ellipse'}},
        {data: {id: 'k', name: 'Sink Event', weight: 100, colorCode: 'green', shapeType: 'ellipse'}}
      ],
      edges: [
        {data: {source: 'a', target: 'b', colorCode: 'blue', strength: 10}},
        {data: {source: 'b', target: 'c', colorCode: 'blue', strength: 10}},
        {data: {source: 'c', target: 'd', colorCode: 'blue', strength: 10}},
        {data: {source: 'c', target: 'e', colorCode: 'blue', strength: 10}},
        {data: {source: 'c', target: 'f', colorCode: 'blue', strength: 10}},
        {data: {source: 'e', target: 'j', colorCode: 'red', strength: 10}},
        {data: {source: 'e', target: 'k', colorCode: 'green', strength: 10}}
      ]
    };**/
  }

}
