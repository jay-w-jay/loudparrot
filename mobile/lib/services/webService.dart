import 'package:http/http.dart' as http;
import 'package:http/http.dart';


class Resource<T> {
  final String url; 
  T Function(Response response) parse;

  Resource({this.url,this.parse});
}

class Webservice {
  static String get apiServerUrlRoot {
    return "https://api.musele.dynu.net/task-manager";
  }

  

  Future<T> load<T>(Resource<T> resource) async {

      final response = await http.get(apiServerUrlRoot + resource.url);
      if(response.statusCode == 200) {
        return resource.parse(response);
      } else {
        throw Exception('Failed to load data!');
      }
  }

  Future<T> post<T>(Resource<T> resource) async {
    final response = await http.post(apiServerUrlRoot + resource.url, 
    headers: {"Content-type": "application/json"},
    body: resource.toString()
    );

    if (response.statusCode == 200) {
      return resource.parse(response);
    } else {
      throw Exception('Failed to post data!');
    }

  }

}