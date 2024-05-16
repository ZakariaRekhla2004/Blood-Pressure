// ignore_for_file: unnecessary_this

import 'dart:convert';

import 'package:dio/dio.dart' as Dio;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as Http;
import 'package:flutter_front/models/user.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Auth extends ChangeNotifier {
    final String _Url = 'http://10.0.2.2:8000/api';
 

   _setHeaders()=>
    {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': 'Bearer $token'
    };

  }

  //   bool _isLoggedIn = false;
//   late User? _user;
//   late String? _token;

//   bool get authenticated => _isLoggedIn;
//   User? get user => _user;

//   final storage = new FlutterSecureStorage();

//   void login({Map ?creds}) async {
//     print(creds);

//     try {
//       Dio.Response response = await dio().post('/auth/login', data: creds);
//       print(response.data.toString());

//       String token = response.data.toString();
//       this.tryToken(token: token);
//     } catch (e) {
//       print(e);
//     }
//   }

//   void tryToken({required String token}) async {
//     if (token == null) {
//       return;
//     } else {
//       try {
//         Dio.Response response = await dio().get('/auth/login',
//             options: Dio.Options(headers: {'Authorization': 'Bearer $token'}));
//         this._isLoggedIn = true;
//         this._user = User.fromJson(response.data);
//         this._token = token;
//         this.storeToken(token: token);
//         notifyListeners();
//         print(_user);
//       } catch (e) {
//         print(e);
//       }
//     }
//   }

//   void storeToken({required String token}) async {
//     this.storage.write(key: 'token', value: token);
//   }

//   void logout() async {
//     try {
//       Dio.Response response = await dio().get('/auth/logout',
//           options: Dio.Options(headers: {'Authorization': 'Bearer $_token'}));

//       cleanUp();
//       notifyListeners();
//     } catch (e) {
//       print(e);
//     }
//   }

//   void cleanUp() async {
//     _user = null;
//     this._isLoggedIn = false;
//     _token = null;
//     await storage.delete(key: 'token');
//   }