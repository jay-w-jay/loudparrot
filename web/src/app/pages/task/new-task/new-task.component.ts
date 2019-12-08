import { Component, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId: string;
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter();

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params[`listId`];
      }
    );
  }

  createTask(title: string) {
    if (title.length > 0) {
      this.taskService.createTask(this.listId, title).subscribe((task: Task) => {
          this.taskAdded.emit(task);
      });
    }
  }

}
