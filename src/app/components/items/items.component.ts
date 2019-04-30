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
  
  constructor(private itemService: ItemService) { }
  
  ngOnInit() {
    this.itemSubscription = this.itemService.getItems().subscribe(
      (items) => {
        //console.log(items);
        this.items = items;
      });
    }
    
  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

  }
  