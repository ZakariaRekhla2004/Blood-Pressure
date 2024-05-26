// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';
import 'package:flutter_front/screens/auth/view/CompleteDossier.dart';
import 'package:flutter_front/screens/auth/view/Login.dart';
import 'package:flutter_front/screens/home/views/home.dart';
import 'package:flutter_front/utils/Routes.dart';

import 'package:shared_preferences/shared_preferences.dart';
// import './screens/auth/';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Test App',
      debugShowCheckedModeBanner: false,
      home: CheckAuth(),
      onGenerateRoute: Routes.generateRoute,
    );
  }
}

class CheckAuth extends StatefulWidget {
  const CheckAuth({super.key});

  @override
  _CheckAuthState createState() => _CheckAuthState();
}

class _CheckAuthState extends State<CheckAuth> {
  bool isAuth = false;

  bool comp = false;

  

  @override
  void initState() {
    _checkIfLoggedIn();
    // _checkIfCompleted();
    super.initState();
  }
  

  void _checkIfLoggedIn() async {
    SharedPreferences localStorage = await SharedPreferences.getInstance();
    var token = localStorage.getString('token');
    if (token != null) {
      setState(() {
        isAuth = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget child;

    if (!isAuth) {
      child = Login();
    } else {
        child = Login();
    }
    return Scaffold(
      body: child,
    );
  }
}
