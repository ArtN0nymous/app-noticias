export interface NewsResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author:      null | string;
    title:       string;
    description: null | string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date | string;
    content:     null | string;
}

export interface Source {
    id:   null | string;
    name: string;
}
/**DEFINE LAS PROPEIDADES PARA N CANTIDAD DE TIPOS CATEGORIAS */
export interface ArticleByCategoryAndPage{
    [key:string]:{
        page:number,
        articles:Article[]
    }
}