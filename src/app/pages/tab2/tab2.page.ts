import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public categories:string[]=['business','entertainment','general','health','science','sports','technology']
  public defaultCategorie=this.categories[0];
  /**STATUC = TRUE PARA CARGAR EL COMPONENTE Y PODER USARLO EN EL ngOninit */
  @ViewChild(IonInfiniteScroll,{static:true}) ionInfiniteScroll!:IonInfiniteScroll;
  articles:Article[]=[];
  constructor( private dataService:DataService) {}
  ngOnInit(): void {
      this.dataService.getTopHeadlinesByCategory(this.defaultCategorie).subscribe((articulos:Article[])=>{
        this.articles=[...articulos];
      })
  }
  segmentChanged( event:any){
    this.defaultCategorie=event.detail.value;
    this.dataService.getTopHeadlinesByCategory(this.defaultCategorie).subscribe((articulos:Article[])=>{
      this.articles=[...articulos];
    });
  }
  loadData(){
    this.dataService.getTopHeadlinesByCategory(this.defaultCategorie,true).subscribe(articulos=>{
      this.articles=articulos;
      /**VALIDAMOS SI EL ULTIMO ELEMENTO DEL ARRGELO DE ARTICULOS LOCAL ES IGUAL AL TITULO DEL ULTIMO
       * ELEMENTO DEL ARREGLO DE LA PETICION, SI ES ASÍ ENTONCES SIGNIFICA QUE NO SE HIZO NINGUN CAMBIO
       * Y QUE YA NO HAY MÁS ARTICULOS PARA MOSTRAR
       */
      if(this.articles[-1].title===articulos[-1].title){
        this.ionInfiniteScroll.disabled=true;
        return;
      }
      setTimeout(()=>{
        this.ionInfiniteScroll.complete();
      },1000);
    });
  }
}
