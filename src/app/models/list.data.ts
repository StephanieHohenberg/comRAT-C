export interface LinkData {
  linkWord: string;
  probability: number;
}

export interface AssociationData {
  inputWords: string[];
  linkData: LinkData;
}
