import { AuthService } from './../services/auth.service';
import { Film } from './../Model/film.model';
import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',

})
export class FilmsComponent implements OnInit {
  films !: Film[];

  constructor(private filmService: FilmService, public authService: AuthService) {
    // this.films = filmService.listeFilms();


  }

  ngOnInit(): void {
    this.filmService.listeFilm().subscribe(prods => {
      console.log(prods);
      this.films = prods;

      });
  }

  chargerFilms(){
    this.filmService.listeFilm().subscribe(prods => {
    console.log(prods);
    this.films = prods;
    });
    }


    supprimerFilm(f: Film){
      let conf = confirm("Are you sure?");
      if (conf && f.idFilm !== undefined)
        this.filmService.supprimerFilm(f.idFilm).subscribe(()=>{
          console.log("Movie deleted");
          this.chargerFilms();
        });
    }


}
