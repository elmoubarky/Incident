import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // API url incident 8086
  public apiUrl = '';

  // API url security 9090
  public apiUrl2 = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() { }
}
