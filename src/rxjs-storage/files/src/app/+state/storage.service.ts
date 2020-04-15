import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { initialState, State } from './state';

type StorageChange = ((state: State) => State) | Partial<State>;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private store$ = new BehaviorSubject<State>(initialState);

  get state(): Observable<State> {
    return this.store$.asObservable();
  }

  getCurrentState(): State {
    return this.store$.getValue();
  }

  pluckState<T extends keyof State>(prop: T): Observable<State[T]> {
    return this.state.pipe(
      pluck(prop)
    );
  }

  updateState(change: StorageChange) {
    const state = this.getCurrentState();
    const newState = (typeof change === 'function')
      ? change(state)
      : { ...state, ...change };
    this.store$.next(newState);
  }
}
