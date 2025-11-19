import { Injectable, signal, Signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SignIn {
    loggedIn = signal(false)
}