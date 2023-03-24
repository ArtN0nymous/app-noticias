import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public categories:string[]=['business','entertainment','general','health','science','sports','technology']
  public defaultCategorie=this.categories[0];
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
}
