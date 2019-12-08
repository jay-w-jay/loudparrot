import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:taskman_flugger/models/taskItem.dart';
import 'package:taskman_flugger/models/taskList.dart';
import 'package:taskman_flugger/services/webService.dart';
import 'package:taskman_flugger/widgets/bottomBar.dart';
import 'package:taskman_flugger/widgets/taskItem/newTaskItem.dart';
import 'package:taskman_flugger/widgets/topBar.dart';

import 'taskItemTile.dart';
Card makeCard(TaskItem taskItem) => Card(
          elevation: 8.0,
          margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
          child: Container(
            decoration: BoxDecoration(color: Color.fromRGBO(64, 75, 96, .9)),
            child: makeListTile(taskItem),
          ),
        );



    


class TaskItemListPage extends StatefulWidget {
  TaskItemListPage({Key key, @required this.parentList, @required this.title}) : super(key: key);
  final TaskList parentList;
  final String title;

  @override
  _ItemListPageState createState() => _ItemListPageState(parentList: parentList);
}

class _ItemListPageState extends State<TaskItemListPage> {
  _ItemListPageState({Key key, @required this.parentList});  
  final TaskList parentList;
  final newTaskController = TextEditingController();

  List<TaskItem> taskItems = [];
  @override
  void initState() {
    super.initState();
  }
  
  FloatingActionButton makeFloatingButton() {
    return FloatingActionButton(
      onPressed: () {
        Navigator.push(context, MaterialPageRoute(builder: (context) => NewTaskItemPage(parentList: parentList, title: 'New Task',)));
      },
      child: Icon(Icons.add)
    );
  }

  @override
  Widget build(BuildContext context) {
    final makeBody = Container(
      // decoration: BoxDecoration(color: Color.fromRGBO(58, 66, 86, 1.0)),
      child: Column(
         children: <Widget>[
            makeHeader(),
            Expanded(child: taskListWidget())
         ],
      )
    );
    return Scaffold(
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      appBar: topAppBar(widget),
      body: makeBody,
      floatingActionButton: makeFloatingButton(),
      bottomNavigationBar: bottomAppBar,
    );
  }
  addNewTask() {
  if (newTaskController.text.length > 3) {
      newTaskController.text = "";  
     TaskItem newItem = TaskItem(title: newTaskController.text, completed: false, listId: parentList.id);
     TaskItem.saveTaskItem(newItem);
     this.taskItems.add(newItem);
    
    for (int i = 0; i < taskItems.length; i++) {
      print(taskItems[i].title);
    }
  }
}

Widget taskListWidget() {
      return FutureBuilder(
        builder: (context, taskListResponse) {
          if (taskListResponse.connectionState == ConnectionState.none)
            return Center(child: CircularProgressIndicator());
          if (taskListResponse.data == null)
            return Center(child: CircularProgressIndicator());

          this.taskItems = taskListResponse.data;
          return ListView.builder(
            itemCount: this.taskItems.length,
            itemBuilder: (context, index){
              return makeCard(this.taskItems[index]);
            },
          );
        },
        future: Webservice().load(TaskItem.getTaskItems(parentList)),
      );
    }

Row makeHeader() {
  return Row(children: <Widget>[
    Expanded(
      child: Card(
        elevation: 2.0,
        margin: new EdgeInsets.symmetric(horizontal: 12.0, vertical: 3.0),
        child: TextField(
        controller: newTaskController,
        onSubmitted: addNewTask(),
        decoration: InputDecoration(
          border: InputBorder.none, 
          hintText: 'Add new task...')
          ,),
      )    ),
  ],);
}
}
