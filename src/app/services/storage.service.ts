import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles:Article[]=[];
  constructor(private storage: Storage) {
    this.init();
  }
  get getLocalArticles(){
    return [...this._localArticles];
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadArticles();
  }
  async saveRemoveArticle(article:Article){
    const exist = this._localArticles.find(localArticle=>localArticle.title===article.title);
    if(exist){
      this._localArticles=this._localArticles.filter(localArticle=>localArticle.title!==article.title);
    }else{
      this._localArticles=[article,...this._localArticles];
    }
    this._storage?.set('articles',this._localArticles);
  }
  async loadArticles(){
    try{
      const articles = await this.storage.get('articles');
      this._localArticles=articles||[];
    }catch(error){
      console.log(error);
    }
  }
  articleInFavorites(article:Article){
    /**DOBLE NEGACIÓN REGRESA VALOR BOOLEANO, AL NEGAR LA PRIMERA VES RESULTA FALSO YA QUE
     * ES UN OBJECTO Y AL NEGAR OTRA VEZ LA GENACIÓN SE VUELVE VERDADERA
     */
    return !!this._localArticles.find(localaArticle=>localaArticle.title===article.title);
  }
}
