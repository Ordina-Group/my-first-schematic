import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { initialState, <%= classify(name) %>State } from './<%= dasherize(name) %>-state';

type StorageChange = ((state: <%= classify(name) %>State) => <%= classify(name) %>State) | Partial<<%= classify(name) %>State>;

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>StorageService {
  private store$ = new BehaviorSubject<<%= classify(name) %>State>(initialState);

  get state(): Observable<<%= classify(name) %>State> {
    return this.store$.asObservable();
  }

  getCurrentState(): <%= classify(name) %>State {
    return this.store$.getValue();
  }

  pluckState<T extends keyof <%= classify(name) %>State>(prop: T): Observable<<%= classify(name) %>State[T]> {
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
