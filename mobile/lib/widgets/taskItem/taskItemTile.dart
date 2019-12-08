import 'package:flutter/material.dart';
import 'package:taskman_flugger/models/taskItem.dart';

ListTile makeListTile(TaskItem taskItem) => ListTile(
          contentPadding:
              EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
          leading: Container(
            padding: EdgeInsets.only(right: 12.0),
            decoration: new BoxDecoration(
                border: new Border(
                    right: new BorderSide(width: 1.0, color: Colors.white24))),
            child: Icon(taskItem.completed ?  Icons.undo : Icons.check, color: Colors.white),
          ),
          title: Text(
            taskItem.title,
            style:  taskItem.completed ? TextStyle(color: Colors.grey, fontWeight: FontWeight.normal, decoration: TextDecoration.lineThrough) : TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          trailing: Icon(Icons.keyboard_arrow_right, color: Colors.white, size: 30.0),
          onTap: () { taskItem.completed = !taskItem.completed; },
        );