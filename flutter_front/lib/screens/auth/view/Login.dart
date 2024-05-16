// ignore_for_file: file_names, library_private_types_in_public_api
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/components/loginWidgets/ButtonWidget.dart';
import 'package:flutter_front/components/loginWidgets/HeaderGlobal.dart';
import 'package:flutter_front/components/loginWidgets/HeaderLogin.dart';
import 'package:flutter_front/components/loginWidgets/InputField.dart';
import 'package:flutter_front/screens/auth/view/Register.dart';
import 'package:flutter_front/screens/home/views/home.dart';
// import 'package:flutter_front/services/auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
// import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<Login> {
  bool _isLoading = false;
  final _formKey = GlobalKey<FormState>(); 
  var email;
  var password;
  // final _scaffoldKey = GlobalKey<ScaffoldState>();
  // _showMsg(msg) {
  //   final snackBar = SnackBar(
  //     content: Text(msg),
  //     action: SnackBarAction(
  //       label: 'Close',
  //       onPressed: () {
  //         // Some code to undo the change!
  //       },
  //     ),
  //   );
  //   _scaffoldKey.currentState.showSnackBar(snackBar());
  // }

  late TextEditingController emailController;
  late TextEditingController passwordController;
  @override
  void initState() {
    super.initState();
    emailController = TextEditingController();
    passwordController = TextEditingController();
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return HeaderGlobal(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SizedBox(height: 20),
          Header(title: "Login", subtitle: "Welcome Back"),
          SizedBox(height: 20),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(60),
                  topRight: Radius.circular(60),
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(30),
                child: Column(
                  children: <Widget>[
                    Image.asset(
                      "assets/Doctors-pana.png", // Adjust the image path
                      width: 300, // Adjust the image width as needed
                      height: 200, // Adjust the image height as needed
                      fit: BoxFit.cover,
                    ),
                    Column(
                      children: <Widget>[
                        InputField(
                          hintText: "Email ",
                          controller: emailController,
                          onChanged: (value) {
                            emailController.text = value;

                          },
                        ),
                        InputField(
                          hintText: "Password",
                          obscureText: true,
                          controller: passwordController,
                          onChanged: (value) {
                            passwordController.text = value;
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 30),
                    Text("Forgot Password?",
                        style: TextStyle(color: Colors.grey, fontSize: 16)),
                    SizedBox(height: 10),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => RegisterPage()),
                        );
                      },
                      child: Text(
                        "Create new account",
                        style: TextStyle(
                            color: Colors.blue,
                            fontSize: 16,
                            decoration: TextDecoration.underline),
                      ),
                    ),
                    SizedBox(height: 30),
                    CustomButton(
                      title: _isLoading? 'Proccessing...' : 'Login',
                      onPressed: () {
                        _login();
      
                      },
                      color: const Color.fromARGB(255, 4, 27, 46),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _login() async {
  setState(() {
    _isLoading = true;
  });

  var data = {'email': emailController.text, 'password': passwordController.text};
    print('aaaaaaaaaaaaaaaaaaaa ${data}');

    var res = await Network().authData(data, '/auth/login');
    var body = json.decode(res.body);
    print('aaaaaaaaaaaaaaaaaaaa ${body}');

    if (res.statusCode == 200) {
      print('aaaaaaaaaaaaaaaaaaaa');
      SharedPreferences localStorage = await SharedPreferences.getInstance();
      localStorage.setString('token', json.encode(body['token']));
      localStorage.setString('token1', json.encode(body['token']));
      localStorage.setString('user', json.encode(body['user']));
      localStorage.setString('id', json.encode(body['_id']));
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => YourHomePage()),
      );
    } else {
    }
  setState(() {
    _isLoading = false;
  });
}}
