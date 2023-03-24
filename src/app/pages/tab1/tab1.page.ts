import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public articles:Article[]=[];
  constructor(private dataService:DataService) {}
  ngOnInit(): void {
      this.dataService.getTopHeadlines().subscribe((articulos:Article[])=>{
        this.articles=[...articulos];
        console.log(this.articles)
      });
  }

}
