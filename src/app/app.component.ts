import { Component, ViewChild } from '@angular/core';

import { DayComponent } from './day/day.component';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular1';
  faTimes = faTimes;

  faSearch = faSearch;
  htmlContent = '';
  days = [];
  selectedDay = -1;
  selectedTask = -1;
  selectedTaskDetails = { content: '', instructions: '', index: 1 };

  addDay() {
    if (!this.checkSave()) return;
    let day = this.days.length ? this.days[this.days.length - 1]['day'] + 1 : 1;
    this.days.push({ day, component: new DayComponent() });
  }
  removeDay(day) {
    if (!this.checkSave()) return;
    this.days = this.days.filter((dayObj, index) => {
      if (day == dayObj['day'] && index == this.selectedDay) {
        this.selectedDay = -1;
        this.selectedTask = -1;
        this.selectedTaskDetails = { content: '', instructions: '', index: 1 };
      }
      return day != dayObj['day'];
    });
  }
  selectDay(day) {
    if (!this.checkSave()) return;
    this.days.forEach((dayObj, index) => {
      if (day == dayObj['day']) this.selectedDay = index;
    });
    this.selectedTask = -1;
    this.selectedTaskDetails = { content: '', instructions: '', index: 1 };
  }
  addTask() {
    if (!this.checkSave()) return;
    let title = (<HTMLInputElement>document.getElementById('topic-title'))
      .value;
    let type = (<HTMLSelectElement>document.getElementById('topic-type')).value;
    let content = (<HTMLInputElement>document.getElementById('topic-content'))
      .value;
    let instructions = (<HTMLInputElement>(
      document.getElementById('topic-instructions')
    )).value;
    if (!title) {
      alert('title not entered');
      return;
    }
    this.days[this.selectedDay]['component'].tasks.push({
      title,
      type,
      content,
      instructions,
    });
  }
  selectTask(index, task) {
    if (!this.checkSave()) return;
    this.selectedTaskDetails = {
      content: task['content'],
      instructions: task['instructions'],
      index: 1,
    };
    this.htmlContent = this.selectedTaskDetails['content'];
    this.selectedTask = index;
  }
  removeTask(taskIndex) {
    if (!this.checkSave()) return;
    this.days[this.selectedDay]['component'].tasks = this.days[
      this.selectedDay
    ]['component'].tasks.filter((task, index) => {
      if (index == taskIndex && index == this.selectedTask) {
        this.selectedTask = -1;
        this.selectedTaskDetails = { content: '', instructions: '', index: 1 };
      }
      return index != taskIndex;
    });
  }
  moveTask() {
    let movedToDay = (<HTMLSelectElement>(
      document.getElementById('topic-moveto')
    )).value;
    let topic = this.days[this.selectedDay]['component'].tasks[
      this.selectedTask
    ];
    this.days[movedToDay]['component'].tasks.push(topic);
    this.removeTask(this.selectedTask);
  }

  showContent() {
    if (!this.checkSave()) return;
    this.htmlContent = this.selectedTaskDetails['content'];
    this.selectedTaskDetails['index'] = 1;
  }

  showInstructions() {
    if (!this.checkSave()) return;
    this.htmlContent = this.selectedTaskDetails['instructions'];
    this.selectedTaskDetails['index'] = 2;
  }

  save() {
    if (this.selectedTaskDetails['index'] == 1) {
      this.selectedTaskDetails['content'] = this.htmlContent;
      this.days[this.selectedDay]['component'].tasks[this.selectedTask][
        'content'
      ] = this.selectedTaskDetails['content'];
    } else if (this.selectedTaskDetails['index'] == 2) {
      this.selectedTaskDetails['instructions'] = this.htmlContent;
      this.days[this.selectedDay]['component'].tasks[this.selectedTask][
        'instructions'
      ] = this.selectedTaskDetails['instructions'];
    }
  }

  checkSave() {
    if (this.selectedDay < 0 || this.selectedTask < 0) return true;
    let saved = true;
    if (this.selectedTaskDetails['index'] == 1) {
      if (this.selectedTaskDetails['content'] != this.htmlContent)
        saved = false;
    } else if (this.selectedTaskDetails['index'] == 2) {
      if (this.selectedTaskDetails['instructions'] != this.htmlContent)
        saved = false;
    }
    if (!saved) {
      if (confirm('changes not saved. Proceed?')) {
        this.htmlContent = '';
        return true;
      } else return false;
    }
    return true;
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '60vh',
    minHeight: '100',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
}