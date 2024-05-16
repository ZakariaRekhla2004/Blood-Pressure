// import 'dart:convert';
// import 'package:http/http.dart' as http;
// import 'package:shared_preferences/shared_preferences.dart';

// class Network {
//   final String _url = 'http://10.0.2.2:8000/api';
//   //if you are using android studio emulator, change localhost to 10.0.2.2
//   var token;


//   authData(data, apiUrl) async {
//     var fullUrl = _url + apiUrl;
//     print(  "rrr  ${ await http.post(Uri.parse(fullUrl),
//         body: jsonEncode(data), 
//         headers: _setHeaders())}");
//     return await http.post(Uri.parse(fullUrl),
//         body: jsonEncode(data), 
//         headers: _setHeaders());
//   }

//   getData(apiUrl) async {
//     var fullUrl = _url + apiUrl;
//     await _getToken();
//     return await http.get(Uri.parse(fullUrl), headers: _setHeaders());
//   }

//  Map<String, String>? _setHeaders() {
//   return {
//     'Content-type': 'application/json',
//     'Accept': 'application/json',
//     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
//     "Access-Control-Allow-Credentials":
//         true.toString(), // Required for cookies, authorization headers with HTTPS
//     "Access-Control-Allow-Headers":
//         "Origin,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,locale",
//     "Access-Control-Allow-Methods": "POST, OPTIONS"
//     // 'Authorization': 'Bearer $token'
//   };
// }
// }
