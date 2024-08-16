import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-secret-modal',
  templateUrl: './secret-modal.component.html',
  styleUrls: ['./secret-modal.component.css']
})
export class SecretModalComponent {
  constructor(public bsModalRef: BsModalRef){

  }
}
