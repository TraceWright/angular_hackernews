export interface SearchResultsModel {
    // exhaustiveNbHits: boolean;
    hits: SearchResultsHits[];
    hitsPerPage: number;
    nbHits: number;
    nbPages: number;
    page: number;
    params: string;
    processingTimeMS: number;
    query: string;
}

export interface SearchResultsHits {
    author: string | null;
    points: number;
    title: string;
    url: string;
}