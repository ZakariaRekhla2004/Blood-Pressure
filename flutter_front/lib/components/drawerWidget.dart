import 'package:flutter/material.dart';

class DrawerWidget extends StatefulWidget {
  final GlobalKey<ScaffoldState> scaffoldKey;

  const DrawerWidget({Key? key, required this.scaffoldKey}) : super(key: key);

  @override
  _DrawerWidgetState createState() => _DrawerWidgetState();
}
class _DrawerWidgetState extends State<DrawerWidget> {
  late double _screenWidth;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _screenWidth = MediaQuery.of(context).size.width;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 250,
      child: Drawer(
        child: Container(
          width: _screenWidth,
          child: Stack(
            children: [
              // Top container with black color
              Container(
                color: Color.fromARGB(255, 16, 72, 111),
                height: _screenWidth / 4,
              ),
              Positioned(
                top: _screenWidth / 4,
                child: SizedBox(
                  width: _screenWidth,
                  height: double.infinity, // Fills remaining space
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // User profile section
                      SizedBox(
                        height: 150, // Adjust height as needed
                        child: Stack(
                          children: [
                            Positioned(
                              top: 0,
                              left: 0,
                              child: ClipRRect(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(100)),
                                child: Image.asset(
                                  'assets/icons8-appointment-48.png',
                                  fit: BoxFit.fill,
                                  height: 100,
                                  width: 100,
                                ),
                              ),
                            ),
                            Positioned(
                              top: 20,
                              left: 120,
                              child: Text(
                                'Profile',
                                style: TextStyle(
                                  color: Colors.white, // Change text color to white
                                  fontSize: 25,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Menu options
                      Padding(
                        padding: const EdgeInsets.only(top: 20.0, left: 20.0),
                        child: Column(
                          children: const [
                            Text(
                              'Appointment',
                              style: TextStyle(
                                color: Colors.white, // Change text color to white
                                fontSize: 25,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.only(top: 6.0, bottom: 6.0),
                              child: Text(
                                'My Cart',
                                style: TextStyle(
                                  color: Colors.white, // Change text color to white
                                  fontSize: 25,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 50,
                left: 20,
                child: Text(
                  'Logout',
                  style: TextStyle(
                    color: Colors.white, // Change text color to white
                    fontSize: 25,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
