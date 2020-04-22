import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { initialState, <%= classify(name) %>State } from './<%= dasherize(name) %>-state';
import { <%= classify(name) %>StorageService } from './<%= dasherize(name) %>-storage.service';

const stateA: <%= classify(name) %>State = {
  list: [{id: '1', name: 'prop1'}, {id: '2', name: 'prop2'}],
  selectedId: '1'
};
const stateB: <%= classify(name) %>State = {
  list: [{id: '1', name: 'prop1'}, {id: '2', name: 'prop2'}, {id: '3', name: 'prop3'}],
  selectedId: '2'
};

describe('<%= classify(name) %>StorageService', () => {
  let service: <%= classify(name) %>StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(<%= classify(name) %>StorageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial state', () => {
    expect(service.getCurrentState()).toBeDefined();
  });

  it('should read the state as a stream', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({cold, expectObservable}) => {
      cold('--a--b--', {a: stateA, b: stateB}).subscribe(state => service.updateState(state));
      expectObservable(service.state).toBe('i-a--b--', {i: initialState, a: stateA, b: stateB});
    });
  });

  it('should read a property of the state as a stream', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({cold, expectObservable}) => {
      cold('--a--b--', {a: stateA, b: stateB}).subscribe(state => service.updateState(state));
      expectObservable(service.pluckState('selectedId')).toBe('i-a--b--', {i: null, a: '1', b: '2'});
    });
  });
});
