import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { IItem } from 'src/app/models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  
  items: IItem[];
  itemSubscription: Subscription;
  editState: boolean = false;
  itemToEdit: IItem;
  
  constructor(private itemService: ItemService) { }
  
  ngOnInit() {
    this.itemSubscription = this.itemService.getItems().subscribe(
      (items) => {
        //console.log(items);
        this.items = items;
      });
    }
  
  deleteItem(event, item: IItem) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event, item: IItem) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: IItem) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.itemToEdit = null;
  }
    
  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  }
  