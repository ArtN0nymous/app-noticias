import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public articles:Article[]=[];
  @ViewChild(IonInfiniteScroll) infiniteScroll!:IonInfiniteScroll;
  constructor(private dataService:DataService) {}
  ngOnInit(): void {
      this.dataService.getTopHeadlines().subscribe((articulos:Article[])=>{
        this.articles=[...articulos];
        console.log(this.articles)
      });
  }
  loadData(){
    this.dataService.getTopHeadlinesByCategory('business',true).subscribe(articulos=>{
      this.articles=articulos;
      if(this.articles[-1].title===articulos[-1].title){
        this.infiniteScroll.disabled=true;
        return;
      }
      setTimeout(() => {
        this.infiniteScroll.complete();
      }, 1000);
    });
  }

}
