import { Component, NgModule, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    PopoverComponent
  ]
})
export class PopoverModule {}
