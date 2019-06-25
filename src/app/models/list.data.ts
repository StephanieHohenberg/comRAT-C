export interface LinkData {
  ID: number;
  word1: string;
  link_strength: number;
  word2: string;
}

export interface CommonLinkData {
  word: string;
  ID: number[];
  link_strength: number[];
}

export interface WordData {
  word: string;
  associationAmount: number;
}

export interface TableData {
  rank: number;
  link_strength: number[];
  label: string;
  pre: boolean | undefined;
}
