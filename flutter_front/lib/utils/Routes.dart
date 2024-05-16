import 'package:flutter/material.dart';
import 'package:flutter_front/screens/ExamTension/ExamTension.dart';
import 'package:flutter_front/screens/home/views/home.dart';
class Routes {
  static const String home = '/';
  static const String examTension = '/exam_tension';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case home:
        return MaterialPageRoute(builder: (_) => YourHomePage());
      case examTension:
        return MaterialPageRoute(builder: (_) => TensionExam());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}