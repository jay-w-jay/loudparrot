
import 'dart:convert';

import 'package:taskman_flugger/models/taskList.dart';

import '../services/webService.dart';

class TaskItem {
  String title;
  String id;
  bool completed;
  String listId;

  TaskItem({this.title, this.completed, this.id, this.listId});

  factory TaskItem.fromJson(Map<String, dynamic> json) {
    return TaskItem(
      title: json["title"],
      listId: json["_listId"],
      id: json["_id"],
      completed: json["completed"]
    );
  }

   static Resource<TaskItem> addNewItem(TaskItem newItem) {
     print ('Adding new task...');
    return Resource(
        url: "/lists/" + newItem.listId  ,
        parse: (response) {
          final result = json.decode(response.body);
          return TaskItem.fromJson(result);
        }
    );
  }

   static Resource<List<TaskItem>> getTaskItems(TaskList list) {    
    return Resource(
      url: "/lists/" + list.id + "/tasks/",
      parse: (response) {
        final result = json.decode(response.body); 
        Iterable list = result;
        return list.map((model) => TaskItem.fromJson(model)).toList();
      }
    );

  }
}