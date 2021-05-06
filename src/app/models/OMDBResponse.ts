
export type OMDBResponse = {
  Search: Movie[],
  totalResults: number;
};

export type Movie = {
  nominated: boolean;
  Title: string ,
  Year: string,
  imdbID: string,
  'Type': string,
  'Poster': string
};
