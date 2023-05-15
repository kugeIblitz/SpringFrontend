import { Categorie } from './../Model/categorie.model';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: [
  ]
})
export class UpdateCategorieComponent implements OnInit {
  @Input()
  categorie! : Categorie;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  @Input()
ajout!:boolean;


  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.categorie);
  }

  saveCategorie(){
    this.categorieUpdated.emit(this.categorie);
    }

}
