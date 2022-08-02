export interface IHackerNewsStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IHackerNewsUser {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}
