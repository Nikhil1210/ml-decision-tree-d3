import {Component, OnInit} from '@angular/core';
import {ModelService} from '../../shared/services/model/model.service';
import {IModel} from '../../shared/interfaces/IModel';
import 'rxjs/Rx';
@Component({
    styleUrls: ['/model.component.css'],
    templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit {
public localVar:string;
model:IModel;
constructor(private modelService: ModelService) {

}

ngOnInit(): void {
    this.localVar = 'inside cons';
    this.modelService.ModelData().subscribe((data: IModel) => {
        this.model = data;
    }, (err: Error) => {
        console.error(err);
        // toast message
    });
}

}
