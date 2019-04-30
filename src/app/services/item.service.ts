import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { IItem } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemCollection: AngularFirestoreCollection<IItem>;
  items: Observable<IItem[]>;

  constructor(public afs: AngularFirestore) { }

  getItems() {
    return this.items = this.afs.collection('items').valueChanges();
  }

}
