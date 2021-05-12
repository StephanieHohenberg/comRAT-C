export interface GraphData {
  nodes: NodeDataWrapper[];
  edges: EdgeDataWrapper[];
}

export interface NodeDataWrapper {
  data: NodeData;
}

export interface EdgeDataWrapper {
  data: EdgeData;
}

export class NodeData {

  public id;
  public label: string;
  public colorCode = 'grey';
  public weight = 30;

  constructor(ID, word: string) {
    this.id = ID;
    this.label = word;
  }
}

export class EdgeData {
  public source;
  public target;
  public linkID: number;
  public link_strength: number;

  constructor(sourceID, targetID, linkID: number, link_strength: number) {
    this.source = sourceID;
    this.target = targetID;
    this.linkID = linkID;
    this.link_strength = link_strength;
  }
}
