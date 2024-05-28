// ignore_for_file: library_private_types_in_public_api

import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_front/firebase_options.dart';
import 'package:flutter_front/screens/auth/view/Login.dart';
import 'package:flutter_front/screens/home/views/home.dart';
import 'package:flutter_front/utils/Routes.dart';
import 'package:firebase_core/firebase_core.dart';

import 'package:shared_preferences/shared_preferences.dart';
// import './screens/auth/';
// import 'firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}

// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   await Firebase.initializeApp();
//   runApp(MyApp());
// }
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
late Timer _logoutTimer;

@override
void initState() {
  _checkIfLoggedIn();
  super.initState();
}

@override
void dispose() {
  _logoutTimer.cancel(); // Cancel the timer when the widget is disposed
  super.dispose();
}

void _checkIfLoggedIn() async {
  SharedPreferences localStorage = await SharedPreferences.getInstance();
  var token = localStorage.getString('token');
  if (token != null) {
    setState(() {
      isAuth = true;
    });
    _startLogoutTimer();
  }
}

void _startLogoutTimer() {
  var tokenExpireTime = 1440;
  if (tokenExpireTime != null) {
    var tokenExpireTime1 = tokenExpireTime * 60 * 1000;
    var remainingTime = tokenExpireTime1 - DateTime.now().millisecondsSinceEpoch - (5 * 60 * 1000);
    if (remainingTime > 0) {
      _logoutTimer = Timer(Duration(minutes: (remainingTime / 1000 / 60).round()), _logout);
    } else {
      _logout();
    }
  }
}

void _logout() async {
  SharedPreferences localStorage = await SharedPreferences.getInstance();
  print(localStorage.getString('token'));
  localStorage.remove('token');
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (context) => Login()),
  );
}
  @override
  Widget build(BuildContext context) {
    Widget child;

    if (!isAuth) {
      child = Login();
    } else {
        child = Home();
    }
    return Scaffold(
      body: child,
    );
  }
}
