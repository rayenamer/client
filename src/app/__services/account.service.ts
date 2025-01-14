import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from '../_services/likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  private LikeService = inject(LikesService);
  baseUrl = environment.apiUrl;


  //currentUser = signal<User | null>(null);

  currentUser = signal<User | null>(null);

  //constructor() {
  //  const user = localStorage.getItem('user');
  //  if (user) {
  //    this.currentUser.set(JSON.parse(user)); // Correct usage of signal
  //  }
  //}



  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.LikeService.getLikesIds();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
