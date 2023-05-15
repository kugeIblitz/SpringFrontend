import { Categorie } from './../Model/categorie.model';
import { Film } from './../Model/film.model';
import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
})


export class AddFilmComponent implements OnInit {
newFilm=new Film();
msg:string="";


categories!:Categorie[];
newIdCat!:number;
newCategorie!:Categorie;

constructor(private filmService: FilmService,
          private router :Router) { }
          ngOnInit(): void {
            this.filmService.listeCategories().
            subscribe(categories => {console.log(categories);
            this.categories = categories._embedded.categories;
            }
            );
            }
            

  
  addFilm(){
    this.newFilm.categorie = this.categories.find(categorie => categorie.idCat == this.newIdCat)!;
    this.filmService.ajouterFilm(this.newFilm)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['films']);
      });
  }
  

      

}
