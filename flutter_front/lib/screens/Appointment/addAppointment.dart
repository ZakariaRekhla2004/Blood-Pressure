import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/components/HoursPicker.dart';
import 'package:flutter_front/components/loginWidgets/ButtonWidget.dart';
import 'package:flutter_front/screens/Appointment/ListAppointment.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class Appointment extends StatefulWidget {
  final int index;

  Appointment(this.index, {Key? key}) : super(key: key);

  @override
  State<Appointment> createState() => _AppointmentState();
}

class _AppointmentState extends State<Appointment> {
  bool _isLoading = false;

  late Size size;
  DateTime? selectedDate;
  TimeOfDay? selectedTime;
  late TextEditingController heureExamenController;

  final _formKey = GlobalKey<FormState>();
  @override
  void initState() {
    super.initState();

    // systoliqueController = TextEditingController();
    // diastoliqueController = TextEditingController();
    // dateExamenController = TextEditingController();
    heureExamenController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    size = MediaQuery.of(context).size;
    return Scaffold(
       backgroundColor: Color(0xFFF6F7FB),
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text(
          " Add Appointment",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        elevation: 0,
      ),
      
      body: Container(
        height: size.height,
        width: size.width,
        color: Colors.white,
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: SfDateRangePicker(
                        selectionMode: DateRangePickerSelectionMode.single,
                        backgroundColor:
                            Color.fromARGB(255, 209, 206, 206).withOpacity(.1),
                        allowViewNavigation: true,
                        enablePastDates: false,
                        headerHeight: 100,
                        selectionColor: Colors.blue,
                        toggleDaySelection: true,
                        showNavigationArrow: true,
                        selectionShape: DateRangePickerSelectionShape.circle,
                        onSelectionChanged: (args) {
                          setState(() {
                            selectedDate = args.value;
                          });
                        },
                        selectionTextStyle: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                        headerStyle: DateRangePickerHeaderStyle(
                            textStyle: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                              fontSize: 20,
                            ),
                            backgroundColor:
                                Color.fromARGB(255, 210, 233, 238)),
                        maxDate: DateTime.now().add(const Duration(days: 365)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 1.0),
                    child: buildTitleField(
                        "Time : ", 25, Colors.black, FontWeight.bold),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 1.0),
                    child: TimePickerField(
                      label: 'Heure Examen',
                      hint: 'Enter heure Examen',
                      txtEditController: heureExamenController,
                      onChanged: (value) {
                        heureExamenController.text = value;
                      },
                    ),
                  ),
                  const SizedBox(height: 40),
                  SizedBox(
                    // width: MediaQuery.of(context).size.width * 0.42
                    height: 55,
                    child: CustomButton(
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          if (selectedDate != null &&
                              heureExamenController != null) {
                                
                            // Save the date and time
                            print("Selected Date: $selectedDate");
                            print(
                                "Selected Time: ${heureExamenController.text}");
                                _saveExam();

                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                duration: Duration(seconds: 1),
                                backgroundColor: Colors.green,
                                content: Text(
                                  "You have booked",
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            );
                          } else {
                            // Show error message
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content:
                                    Text("Please select both date and time."),
                              ),
                            );
                          }
                        }
                      },
                  title: _isLoading ? 'Is Sending...' : 'Book an Appointment',
                      color: Colors.blue.shade900,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildTitleField(
      String text, double size, Color color, FontWeight fontWeight) {
    return Text(
      text,
      style: TextStyle(
        color: color,
        fontSize: size,
        fontWeight: fontWeight,
        letterSpacing: 3,
      ),
    );
  }
  String convert12HourTo24Hour(String time) {
  final inputFormat = DateFormat('h:mm a');
  final outputFormat = DateFormat('HH:mm:ss');

  final timeObj = inputFormat.parse(time);
  final formattedTime = outputFormat.format(timeObj);

  return formattedTime;
}
  _saveExam() async {
    setState(() {
      _isLoading = true;
    });
     String twentyFourHourTime = convert12HourTo24Hour(heureExamenController.text);
    // var timeComponents = heureExamenController.text.split(':');
    // var hour = int.parse(timeComponents[0]);
    // var minute = int.parse(timeComponents[1]);
    // var dateTime = DateTime(0, 0, 0, hour, minute);
    SharedPreferences localStorage = await SharedPreferences.getInstance();
    // var token = localStorage.getString('token');
    // print('Authorization'":" 'Bearer ${token}');
    var data = {
      'date' : DateFormat('yyyy-MM-dd').format(selectedDate!),
      'heure' : twentyFourHourTime,
      'status' : "Waiting"
    };
    print('aaaaaaaaaaaaaaaaaaaa ${data}');
    var res = await Network().authData(data, '/apppoint/createAppointment');
    var body = json.decode(res.body);
    print('aaaaaaaaaaaaaaaaaaaa ${body}');
    if (res.statusCode == 201) {
      print('aaaaaaaaaaaaaaaaaaaa');
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => Listappointment()),
      );
    }

    setState(() {
      _isLoading = false;
    });
  }
}
