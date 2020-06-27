import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-move-task-modal',
  templateUrl: './move-task-modal.component.html',
  styleUrls: ['./move-task-modal.component.css'],
})
export class MoveTaskModalComponent {
  closeResult = '';
  @Input()
  moveTask: Function;
  @ViewChild('content') content: ElementRef;
  @Input('days') days;
  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(this.content);
  }
}