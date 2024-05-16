import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Network {
  final String _url = 'http://10.0.2.2:8000/api';
  //if you are using android studio emulator, change localhost to 10.0.2.2
  var token;
  var token1;
  var user;
  var id;

  _getToken() async {
    SharedPreferences localStorage = await SharedPreferences.getInstance();
    token = jsonDecode(localStorage.getString('token')?? "");
    token1 = localStorage.getString('token1') ?? '';
    user = jsonDecode(localStorage.getString('user') ?? '')['user'];
    id = jsonDecode(localStorage.getString('id') ?? '')['id'];
  }

  authData(data, apiUrl) async {
    var fullUrl = _url + apiUrl;
    return await http.post(Uri.parse(fullUrl),
        body: jsonEncode(data), headers: await _setHeaders());
  }

  getData(apiUrl) async {
    var fullUrl = _url + apiUrl;
    await _getToken();
    return await http.get(Uri.parse(fullUrl), headers: await _setHeaders());
  }

 Future<Map<String, String>>_setHeaders() async {
    SharedPreferences localStorage = await SharedPreferences.getInstance();
    var token2 = jsonDecode( localStorage.getString('token') ?? '');
    var headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer $token2',
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true.toString(), // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Headers":
          "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    };
    return headers;
  }
  
  }