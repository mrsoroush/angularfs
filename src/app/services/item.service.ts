import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IItem } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemCollection: AngularFirestoreCollection<IItem>;
  items: Observable<IItem[]>;
  itemDoc: AngularFirestoreDocument<IItem>;

  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('items', ref => ref.orderBy('title', 'asc'));
    this.items = this.itemCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IItem;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
   }

 getItems() {
    return this.items;
  }

  addItem(item: IItem) {
    this.itemCollection.add(item);
  }

  deleteItem(item: IItem) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

}
