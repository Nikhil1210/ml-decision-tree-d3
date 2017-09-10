import {Component, OnInit} from '@angular/core';

@Component({
    styleUrls: ['/model.component.css'],
    templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit {
public localVar:string;
    ngOnInit() : void {
        this.localVar= 'inside cons';
}

}
