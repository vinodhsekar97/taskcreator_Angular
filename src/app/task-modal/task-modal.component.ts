import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  closeResult = '';
  faPlusCircle = faPlusCircle;
  @Input()
  addTask: Function;
  @Input()
  checkSave: Function;
  @ViewChild('content') content: ElementRef;
  constructor(private modalService: NgbModal) {}

  open() {
    if (this.checkSave()) this.modalService.open(this.content);
  }
}