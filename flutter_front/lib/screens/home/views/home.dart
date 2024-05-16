import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/models/category.dart';
import 'package:flutter_front/components/drawerWidget.dart';
import 'package:flutter_front/screens/ExamTension/ExamTension.dart';
import 'package:flutter_front/screens/auth/view/Login.dart';
import 'package:shared_preferences/shared_preferences.dart';

class YourHomePage extends StatefulWidget {
  @override
  _YourHomePageState createState() => _YourHomePageState();
}

class _YourHomePageState extends State<YourHomePage> {
  List<CategoryModel> categories = CategoryModel.getCategories();

  final GlobalKey<ScaffoldState> _scaffoldKey_home = GlobalKey<ScaffoldState>();
  // final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          'BP Tracker',
          style: TextStyle(
            fontSize: 24.0, // Adjust font size as needed
            fontWeight: FontWeight.bold, // Set font weight to bold
            color: Color.fromARGB(255, 28, 89, 151), // Set text color to white
          ),
        ),
        leading: IconButton(
          color: Color.fromARGB(255, 36, 118, 199),
          icon: Icon(Icons.menu),
          iconSize: 30,
          onPressed: () {
            _scaffoldKey_home.currentState?.openDrawer();
          },
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle),
            color: Color.fromARGB(255, 36, 118, 199),

            iconSize: 35,
            // Profile icon
            onPressed: () {
              logout();
              // Navigate to the page displaying user information
              // Navigator.push(
              //   context,
              //   MaterialPageRoute(builder: (context) => UserProfilePage()),
              // );
            },
          ),
        ],
      ),
      drawer: DrawerWidget(scaffoldKey: _scaffoldKey_home),
      body: Center(
        // Wrap the ListView with a Center widget
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: 40),
          children: [
            GridView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 20,
                mainAxisSpacing: 20,
              ),
              itemCount: categories.length,
              itemBuilder: (context, index) {
                return InkWell(
                  onTap: () {
                    switch (categories[index].name) {
                      case 'Exam Tension':
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => TensionExam()),
                        );
                        break;
                      case 'Rendez-vous':
                        Navigator.pushNamed(context, " Routes.examTension");
                        break;
                      case 'Notification':
                        Navigator.pushNamed(context, " Routes.examTension");
                        break;
                      case 'Chat':
                        Navigator.pushNamed(context, "");
                        break;
                      case 'Medicament':
                        Navigator.pushNamed(context, "");
                        break;
                      // Ajoutez d'autres cas pour chaque nom de catégorie que vous souhaitez gérer
                      default:
                        // Cas par défaut si le nom de la catégorie ne correspond à aucun cas
                        print('Unknown category: ${categories[index].name}');
                    }
                  },
                  child: Container(
                    decoration: BoxDecoration(
                      color: categories[index].boxColor.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: Color.fromARGB(255, 166, 210, 218)
                              .withOpacity(0.5),
                          spreadRadius: 3,
                          blurRadius: 5,
                          offset: Offset(0, 3), // changes position of shadow
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(2.0),
                            child: Image.asset(
                              categories[index].iconPath,
                            ),
                          ),
                        ),
                        SizedBox(height: 15),
                        Text(
                          categories[index].name,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 35, 22, 42),
                            fontSize: 16, // Increase font size
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
  void logout() async{
    SharedPreferences localStorage = await SharedPreferences.getInstance();
      localStorage.remove('user');
      localStorage.remove('token');
    // print("aaaa");
    // var res = await Network().getData('/auth/logout');
    // print("aaaa");

    // var body = jsonDecode(res.body);
    // print(res.statusCode == 200);
    // if(res.statusCode == 200){
    // print("aaaaaaaaaaaa");

    //   SharedPreferences localStorage = await SharedPreferences.getInstance();
    //   localStorage.remove('user');
    //   localStorage.remove('token');
      // localStorage.remove('_id');
      Navigator.push(
          context,
          MaterialPageRoute(builder: (context)=>Login()));
    // }
  }
}