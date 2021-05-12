import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  private inputWordsChangedSubject: Subject<string[]> = new Subject<string[]>();


  constructor() {
  }


  public getInputWordsChangedObservable(): Observable<string[]> {
    return this.inputWordsChangedSubject.asObservable();
  }

  public handleInputWordsChanged(words: string[]): void {
    this.inputWordsChangedSubject.next(words);
  }


}
