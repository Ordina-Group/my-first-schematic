import { Model } from './../domain/model';

export interface State {
  list: Model[];
  selectedId: string | number | null;
}

export const initialState: State = {
  list: [],
  selectedId: null
};
