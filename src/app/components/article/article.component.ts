import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  constructor(private actionSheetCtrl:ActionSheetController,private socialSharing:SocialSharing,private platform:Platform) { }

  @Input() i!:number;
  @Input() item!:Article;
  async openArticle(){
    await Browser.open({ url: this.item.url });
  }
  async onOpenMenu(){
    let buttons=[
      {
        text:'Favorito',
        icon:'heart-outline',
        handler:()=>this.onToggleFavorite()
      },
      {
        text:'Cancelar',
        icon:'close-outline',
        role:'cancel'
      }
    ]
    if(this.platform.is('capacitor')){
      buttons.unshift({
        text:'Compartir',
        icon:'share-outline',
        handler:()=>this.onShare()
      },)
    }
    const actionShett=await this.actionSheetCtrl.create({
      header:'Opciones',
      buttons:buttons
    });
    await actionShett.present();
  }
  onShare(){
    this.socialSharing.share(
      this.item.title,
      this.item.source.name,
      undefined,
      this.item.url
    );
  }
  onToggleFavorite(){
    console.log('Add favorito');
  }
}
