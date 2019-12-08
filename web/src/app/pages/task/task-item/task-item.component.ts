import { Component, OnInit, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() taskChanged: EventEmitter<Task> = new EventEmitter();
  constructor(private taskService: TaskService) { }

  ngOnInit() {}

  onToggleComplete() {
    this.task.completed = !this.task.completed;
    this.task.lastModified = Math.round((new Date()).getTime() / 1000);
    this.taskService.completeTask(this.task).subscribe(() => {});
  }

  onDeleteTask() {
    this.taskService.deleteTask(this.task).subscribe((task: Task) => {
      this.taskChanged.emit();
    });
  }

}
