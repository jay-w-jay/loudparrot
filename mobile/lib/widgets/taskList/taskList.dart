import 'package:flutter/material.dart';
import 'package:taskman_flugger/models/taskList.dart';
import 'package:taskman_flugger/services/webService.dart';
import 'package:taskman_flugger/widgets/bottomBar.dart';
import 'package:taskman_flugger/widgets/topBar.dart';

import 'listTile.dart';

Card makeCard(TaskList taskList, BuildContext context) => Card(
          elevation: 8.0,
          margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
          child: Container(
            decoration: BoxDecoration(color: Color.fromRGBO(64, 75, 96, .9)),
            child: makeListTile(taskList, context),
          ),
        );

    Widget taskListWidget(List<TaskList> _taskList) {
      return FutureBuilder(
        builder: (context, taskListResponse) {
          if (taskListResponse.connectionState == ConnectionState.none)
            return Center(child: CircularProgressIndicator());
          if (taskListResponse.data == null)
            return Center(child: CircularProgressIndicator());

          _taskList = taskListResponse.data;
          return ListView.builder(
            itemCount: _taskList.length,
            itemBuilder: (context, index){
              return makeCard(_taskList[index], context);
            },
          );
        },
        future: Webservice().load(TaskList.all),
      );
    }


class ListPage extends StatefulWidget {
  ListPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  List taskList;
  @override
  void initState() {
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
    final makeBody = Container(
      // decoration: BoxDecoration(color: Color.fromRGBO(58, 66, 86, 1.0)),
      child: taskListWidget(taskList)
    );
    return Scaffold(
      backgroundColor: Color.fromRGBO(58, 66, 86, 1.0),
      appBar: topAppBar(widget),
      body: makeBody,
      bottomNavigationBar: bottomAppBar,
    );
  }
}
