import 'package:flutter/material.dart';
import 'package:taskman_flugger/models/taskItem.dart';
import 'package:taskman_flugger/models/taskList.dart';
import 'package:taskman_flugger/services/webService.dart';
import 'package:taskman_flugger/widgets/bottomBar.dart';
import 'package:taskman_flugger/widgets/topBar.dart';


class NewTaskItemPage extends StatefulWidget {
  NewTaskItemPage({Key key, @required this.parentList, @required this.title}) : super(key: key);
  final TaskList parentList;
  final String title;

  @override
  _NewTaskItemPageState createState() => _NewTaskItemPageState(parentList: parentList);
}

class _NewTaskItemPageState extends State<NewTaskItemPage> {
  _NewTaskItemPageState({Key key, @required this.parentList});  
  final TaskList parentList;
  TextEditingController textController = TextEditingController();

  List taskItems;
  @override
  void initState() {
    super.initState();
  }

  saveTask() {
    print('Saving ' + textController.text);

    if (textController.text.length > 3) {
      TaskItem newItem = TaskItem(
        listId: parentList.id,
        title: textController.text
      );
      TaskItem.addNewItem(newItem);
    }

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final makeBody = Container(
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            TextField (
              controller: textController,
              style: new TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Task name...'
              ),
            ),
            RaisedButton(
              onPressed: () {saveTask();},
              child: Text('Save'),
            )
          ],
        ),
      )
    );
    return Scaffold(
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      appBar: topAppBar(widget),
      body: makeBody,
      bottomNavigationBar: bottomAppBar,
    );
  }
}
