import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  listId: string;
  lists: List[];
  tasks: List[];
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.listId = params.listId;
        } else {
          this.listId = undefined;
        }
        this.refreshTasks();
      }
    );

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  refreshTasks() {
    if (this.listId) {
      this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    } else {
      this.tasks = undefined;
    }
  }
}
