import { Categorie } from './../Model/categorie.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from './../Model/film.model';
import { FilmService } from './../services/film.service';

@Component({
  selector: 'app-update-film',
  templateUrl: './update-film.component.html',
  styles: []
})
export class UpdateFilmComponent implements OnInit {
  currentFilm = new Film();
  categories!: Categorie[] ;
  updatedCatId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.filmService.listeCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories._embedded.categories;
    });

    this.filmService.consulterFilm(this.activatedRoute.snapshot.params['id']).subscribe((prod: Film) => {
      this.currentFilm = prod;
      this.updatedCatId = this.currentFilm.categorie.idCat;
    });
    
  }

  updateFilm()  {
    this.currentFilm.categorie = this.categories.find(categorie => categorie.idCat == this.updatedCatId)!;
    this.filmService.updateFilm(this.currentFilm).subscribe(film => {
    this.router.navigate(['films']); }
    );
    }

  }