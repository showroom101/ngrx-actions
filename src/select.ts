import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NgrxSelect {
  static store: any;
  connect(store: Store<any>) {
    NgrxSelect.store = store;
  }
}

export function Select(path?: string): any {
  return function (target: any, name: string, descriptor: TypedPropertyDescriptor <any>): void {
    if (delete target[name]) {
      Object.defineProperty(target, name, {
        get: () => NgrxSelect.store.select(state => getValue(state, path || name)),
        enumerable: true,
        configurable: true
      });
    }
  };
}

function getValue(state, prop) {
  if (prop) return prop.split('.').reduce((acc, part) => acc && acc[part], state);
  return state;
}
