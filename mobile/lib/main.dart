import 'package:flutter/material.dart';
import 'package:taskman_flugger/widgets/taskList/taskList.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of our application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Task List',
      theme: new ThemeData(
          primaryColor: Colors.indigo, fontFamily: 'Raleway'),
      home: new ListPage(title: 'Task List'),
    );
  }
}


