import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

export class TodoListComponent implements OnInit {
  todoList: any[] = [];
  doneList: any[] = [];
  itemToAdd: string = '';
  dateToAdd: string = '';
  categoryToAdd: string = '';

  itemSelected!: any

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;


  categories = [
    { value: 'Lazer', label: 'Lazer' },
    { value: 'Estudo', label: 'Estudo' },
    { value: 'Exercício', label: 'Exercício' },
    { value: 'Compras', label: 'Compras' },
  ];

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  onDelete(item: any) {
    this.itemSelected = item;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
  }

  onConfirmDelete() {
   const index = this.todoList.indexOf(this.itemSelected, 0);
   this.todoList.splice(index, 1);
   this.deleteModalRef.hide();
  }

  onDecliveDelete() {
    this.deleteModalRef.hide();
  }

  addToList() {
    if(this.itemToAdd.length > 0 && this.categoryToAdd && this.dateToAdd) {
    this.todoList.push({
        item: this.itemToAdd,
        date: this.dateToAdd,
        category: this.categoryToAdd
      });
      this.itemToAdd = '';
      this.categoryToAdd = '';
      this.dateToAdd = '';
    }else {
      alert("Preencha todos os campos")
    }
  }

  doItem(index: number) {
    this.doneList.push(this.todoList[index]);
    this.todoList.splice(index, 1);
  }

  handleCategory(value: string) {
    this.categoryToAdd = value;
  }
  removeItem(index: number) {
    this.todoList.push(this.doneList[index]);
    this.doneList.splice(index, 1);
  }
}
