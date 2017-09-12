import {Component, OnInit} from '@angular/core';
import {IModel} from '../../shared/interfaces/IModel';
import {MdSnackBar} from '@angular/material';
import {ModelService} from './model.service';
@Component({styleUrls: ['/model.component.scss'],
    templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit {
public localVar: string;
modelData: IModel;
constructor(private modelService: ModelService, public snackBar: MdSnackBar) {

}

ngOnInit(): void {
    this.localVar = 'inside cons';
    this.modelService.ModelData().subscribe((data: IModel) => {
        this.modelData = data;
         this.snackBar.open('DATA LOADED', 'Success !!', {duration: 4000});
    }, (err: Error) => {
        console.error(err);
        // toast message
    });
}

}
