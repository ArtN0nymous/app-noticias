import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { map, Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsResponse,Article } from '../interfaces';
import { ArticleByCategoryAndPage } from '../interfaces/index';
const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class DataService {
  country:string='us';
  category:string='business';
  private articleByCategoryAndPage:ArticleByCategoryAndPage={};
  /**METODO PARA REALIZAR LAS PETICIONES HTTP A LA API */
  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey:apiKey,
        country: 'us',
      }
    });
   }
  constructor(private http:HttpClient) { }
  /**REGRESAMOS UN OBSERVABLE CON EL TIPO DEFINIDO EN LA INTERFAZ PARA ARTICULO, Y PASAMOS LA RESPUESTA DEL GET POR UN PIPE Y LO
   * MAPEAMOS PARA SOLO REGRESAR LOS ARTICULOS Y NO TODO EL CONTENIDO DE LA SOLICITUD
  */
   getTopHeadlines():Observable<Article[]>{
    return this.getTopHeadlinesByCategory('business');
    }
    getTopHeadlinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]>{
      if(loadMore){
        /**SI QUIERE CARGAR MÁS CARGA MÁS ARTICULOS */
        return this.getArticlesBycategory(category);
      }
      if(this.articleByCategoryAndPage[category]){
        /**of CREA UN OBSERVABLE LO QUE PASES COMO ARGUMENTO */
        /** SI NO ES NECESARIO CARGAR MÁS VERIFICA SI EXISTE LA CATEGORIA Y 
         * REGRESA SUS ELEMENTOS
         */
        return of(this.articleByCategoryAndPage[category].articles);
      }
      /**SI NO EXISTE BUSCA Y REGRESA ESA CATEGORIA */
      return this.getArticlesBycategory(category);
    }
  private getArticlesBycategory(category:string):Observable<Article[]>{
    if(Object.keys(this.articleByCategoryAndPage).includes(category)){
      ///this.articleByCategoryAndPage[category].page+=1;
    }else{
      /**SI NO EXISTE LA CATEGORIA ENTONCES LA CREA */
      this.articleByCategoryAndPage[category]={
        page:0,
        articles:[]
      }
    }
    const page=this.articleByCategoryAndPage[category].page+1;
    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map(({articles})=>{
        if(articles.length===0)return[];
        this.articleByCategoryAndPage[category]={
          page:page,
          articles:[...this.articleByCategoryAndPage[category].articles,...articles]
        }
        return this.articleByCategoryAndPage[category].articles;
      })
    );
  }
}
