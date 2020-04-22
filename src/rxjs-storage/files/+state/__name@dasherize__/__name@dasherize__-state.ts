import { <%= classify(name) %> } from './../../domain/<%= dasherize(name) %>';

export interface <%= classify(name) %>State {
  list: <%= classify(name) %>[];
  selectedId: string | number | null;
}

export const initialState: <%= classify(name) %>State = {
  list: [],
  selectedId: null
};
