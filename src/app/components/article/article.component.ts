import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  constructor() { }

  @Input() i!:number;
  @Input() item!:Article;

}
