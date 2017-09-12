import {Component, OnInit, Input} from '@angular/core';
import {IConfusionMatrix} from "../../../shared/interfaces/IModel";

@Component({
  selector: 'app-confusion-matrix',
  templateUrl: './confusion-matrix.component.html',
  styleUrls: ['./confusion-matrix.component.scss']
})
export class ConfusionMatrixComponent implements OnInit {
@Input() matrix: IConfusionMatrix;
  constructor() { }

  ngOnInit() {
  }

}
