
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_front/components/loginWidgets/ButtonWidget.dart';
import 'package:flutter_front/components/loginWidgets/HeaderGlobal.dart';
import 'package:flutter_front/components/loginWidgets/HeaderLogin.dart';
import 'package:flutter_front/components/loginWidgets/InputField.dart';
import 'package:flutter_front/services/auth.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}


class _RegisterPageState extends State<RegisterPage> {
  TextEditingController nameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();


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
  Future<void> _registerUser() async {
    var data = {
        'name': nameController.text,
        'email': emailController.text,
        'password': passwordController.text,
        // 'phone_number': phoneNumberController.text,
    };
//  var res =await Auth().postData(data,'auth/register');
//     var body = jsonDecode(res.body);
//     if (res.statusCode == 201) {
//       // Navigator.push(context, route)
//     } else {
//       // Handle errors
//       print('Error: ${res.reasonPhrase}');
//     }
  }

  @override
  Widget build(BuildContext context) {
    return HeaderGlobal(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SizedBox(height: 20),
          Header(title: "Sign In", subtitle: "Welcome In your application"),
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
                    Column(
                      children: <Widget>[

                        InputField(
                          hintText: "UserName",
                          controller: nameController,
                          onChanged: (value) {
                            // Handle email input changes
                          },
                        ),
                        InputField(
                          hintText: "Email ",
                          controller: emailController,
                          onChanged: (value) {
                            // Handle email input changes
                          },
                        ),
                        InputField(
                          hintText: "Password",
                          obscureText: true,
                          controller: passwordController,
                          onChanged: (value) {
                            // Handle password input changes
                          },
                        ),
                        InputField(
                          hintText: "Phone Number",
                          obscureText: true,
                          controller: phoneNumberController,
                          onChanged: (value) {
                            // Handle password input changes
                          },
                        ),
                      ],
                    ),
                    SizedBox(height: 40),
                    CustomButton(
                      title: "Sign In",
                      onPressed: () {
                        _registerUser();
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
}

