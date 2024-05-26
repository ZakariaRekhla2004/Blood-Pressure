import 'package:flutter/material.dart';
import 'package:flutter_front/screens/Appointment/addAppointment.dart';
import 'package:flutter_front/screens/ExamTension/ExamTension.dart';
import 'package:flutter_front/screens/home/views/home.dart';
class Routes {
  static const String home = '/';
  static const String examTension = '/exam_tension';
  static const String oppointment = '/Oppointment';
  // final _formKey = GlobalKey<FormState>();


  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case home:
        return MaterialPageRoute(builder: (_) => Home());
      case examTension:
        return MaterialPageRoute(builder: (_) => TensionExam());
        case oppointment:
        return MaterialPageRoute(builder: (_) => Appointment(0));
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