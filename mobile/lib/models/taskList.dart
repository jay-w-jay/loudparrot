
import 'dart:convert';
import '../services/webService.dart';

class TaskList {
  String title;
  String description;
  String id;
  bool protected;
  double percComplete;

  TaskList({this.title, this.description, this.id, this.protected, this.percComplete});

  factory TaskList.fromJson(Map<String, dynamic> json) {
    return TaskList(
      title: json["title"],
      description: json["description"],
      id: json["_id"],
      protected: json["protected"],
      percComplete: 50
    );
  }

   static Resource<List<TaskList>> get all {
    
    return Resource(
      url: "/lists",
      parse: (response) {
        final result = json.decode(response.body); 
        Iterable list = result;
        return list.map((model) => TaskList.fromJson(model)).toList();
      }
    );
  }

  static Resource<TaskList> addNewList(TaskList newList) {
    return Resource(
        url: "/lists" ,
        parse: (response) {
          final result = json.decode(response.body);
          return TaskList.fromJson(result);
        }
    );
  }
}