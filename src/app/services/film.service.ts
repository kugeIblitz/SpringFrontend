import { CategorieWrapper } from './../Model/CategorieWrapped';
import { Categorie } from '../Model/categorie.model';
import { Film } from './../Model/film.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
providedIn: 'root'
})


export class FilmService {
  filmApiURL: string = 'http://localhost:8082/films/api';
  apiURLCat: string = 'http://localhost:8082/films/cat';

  Films !: Film[]; 
  categories!:Categorie[];

  constructor(private http : HttpClient) {

}

listeFilm(): Observable<Film[]>{
  return this.http.get<Film[]>(this.filmApiURL);
  }







ajouterFilm( prod: Film):Observable<Film>{
  return this.http.post<Film>(this.filmApiURL, prod, httpOptions);
  }
  

supprimerFilm(id : number) {
  const url = `${this.filmApiURL}/${id}`;
  return this.http.delete(url, httpOptions);
  }




film!: Film;


  consulterFilm(id: number): Observable<Film> {
    const url = `${this.filmApiURL}/${id}`;
    return this.http.get<Film>(url);
    }
    


  
updateFilm(prod :Film) : Observable<Film>
{
return this.http.put<Film>(this.filmApiURL, prod, httpOptions);
}



trierFilms(){
  this.Films = this.Films?.sort((n1, n2) => {
    if (n1 && n2 && n1.idFilm && n2.idFilm) {
      if (n1.idFilm > n2.idFilm) {
        return 1;
      } else if (n1.idFilm < n2.idFilm) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
  }


  listeCategories():Observable<CategorieWrapper>{
    return this.http.get<CategorieWrapper>(this.apiURLCat);
    }
    
    
      

    consulterCategorie(id:number): Categorie{
      return this.categories.find(categorie => categorie.idCat == id)!;
      }

      rechercherParCategorie(idCat: number):Observable< Film[]> {
        const url = `${this.filmApiURL}/filmscat/${idCat}`;
        return this.http.get<Film[]>(url);
        }

        rechercherParNom(nom: string):Observable< Film[]> {
          const url = `${this.filmApiURL}/filmsByName/${nom}`;
          return this.http.get<Film[]>(url);
          }

          ajouterCategorie( cat: Categorie):Observable<Categorie>{
            return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
            }
            
        



}