import 'dart:ffi';

import 'dart:convert';
import 'package:flutter_front/components/DatePicker.dart';

import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/components/HoursPicker.dart';
import 'package:flutter_front/components/TextField.dart';
import 'package:flutter_front/components/loginWidgets/ButtonWidget.dart';
import 'package:flutter_front/screens/home/views/home.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TensionExam extends StatefulWidget {
  @override
  _AddMedication2State createState() => _AddMedication2State();
}

class _AddMedication2State extends State<TensionExam> {
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  late TextEditingController systoliqueController;
  late TextEditingController diastoliqueController;
  late TextEditingController dateExamenController;
  late TextEditingController heureExamenController;

  @override
  void initState() {
    super.initState();
    systoliqueController = TextEditingController();
    diastoliqueController = TextEditingController();
    dateExamenController = TextEditingController();
    heureExamenController = TextEditingController();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF6F7FB),
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text(
          "Blood Pressure Exam",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        elevation: 0,
      ),
      // Set background color to white
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
          child: ListView(
            children: [
              // Image.asset(
              //   "assets/Online Doctor-pana.png", // Adjust the image path
              //    height: 200,
              //   fit: BoxFit.cover,
              // ),

              Text(
                'Systolique : ', // Ajoutez votre texte ici
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 10),

              // Systolique
              Text_Field(
                label: 'Systolique ',
                hint: 'Enter Systolique',
                isPassword: false,
                keyboard: TextInputType.number,
                txtEditController: systoliqueController,
                onChanged: (value) {
                  systoliqueController.text = value;
                },
              ),
              const SizedBox(height: 10),
              Container(
                  margin: const EdgeInsets.all(10),
                  width: double.infinity,
                  height: 2,
                  color: Color.fromARGB(255, 50, 70, 87)),
              const SizedBox(height: 10),
              // Diastolique
              Text(
                'Diastolique :', // Ajoutez votre texte ici
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 10),
              Text_Field(
                label: 'Diastolique',
                hint: 'Enter Diastolique',
                isPassword: false,
                keyboard: TextInputType.number,
                txtEditController: diastoliqueController,
                onChanged: (value) {
                  diastoliqueController.text = value;
                },
              ),
              const SizedBox(height: 10),
              Container(
                  margin: const EdgeInsets.all(10),
                  width: double.infinity,
                  height: 2,
                  color: Color.fromARGB(255, 50, 70, 87)),
              const SizedBox(height: 10),
              //user note
              Text(
                'Date Examen :', // Ajoutez votre texte ici
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 10),
              DatePickerField(
                label: 'Date of Birth',
                hint: 'Select Date of Birth',
                txtEditController: dateExamenController,
                onChanged: (value) {
                  dateExamenController.text = value;
                },
              ),
              const SizedBox(height: 20),
              // Heure Examen
              TimePickerField(
                label: 'Heure Examen',
                hint: 'Enter heure Examen',
                txtEditController: heureExamenController,
                onChanged: (value) {
                  // Handle changes in Heure Examen
                  heureExamenController.text = value;
                },
              ),
              const SizedBox(height: 20),
              // Add your remaining fields as needed
              // AddMedication3 button
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.42,
                height: 55,
                child: CustomButton(
                  onPressed: () {
                    _saveExam();
                  },
                  title: _isLoading ? 'Is Sending...' : 'Save Exam',
                  color: Colors.blue.shade900,
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 5),
        child: FloatingActionButton(
          onPressed: () {
            //
          },
          backgroundColor: Color.fromARGB(255, 50, 70, 87),
          child: Icon(Icons.camera, size: 30 , color:Color.fromARGB(255, 203, 226, 231),),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
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
      "user_id": localStorage.getString('id'),
      "Systolique": systoliqueController.text,
      "Diastolique": diastoliqueController.text,
      "date_Examen": dateExamenController.text,
      "heure_Examen": twentyFourHourTime
    };
    print('aaaaaaaaaaaaaaaaaaaa ${data}');
    var res = await Network().authData(data, '/TensionExam/addTension_Exam');
    var body = json.decode(res.body);
    print('aaaaaaaaaaaaaaaaaaaa ${body}');

    if (res.statusCode == 201) {
      print('aaaaaaaaaaaaaaaaaaaa');
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => Home()),
      );
    }

    setState(() {
      _isLoading = false;
    });
  }
}





// class AddMedication2 extends StatefulWidget {
//   // List<CategoryModel> categories = [];

//   // AddMedication2({super.key});

//   // void _getInitialInfo() {
//   //   categories = CategoryModel.getCategories();
//   // }

//   @override
//   _AddMedication2State createState() => _AddMedication2State();
// }

// bool isPillCountRequired = false;

// class _AddMedication2State extends State<AddMedication2> {
//   // final user = FirebaseAuth.instance.currentUser;
//   final _formKey = GlobalKey<FormState>();

//   // final TextEditingController _medicationDosageController =
//   //     MedicationControllerData().medicationDosageController;
//   // final TextEditingController _medicationCountController =
//   //     MedicationControllerData().medicationCountController;
//   // final TextEditingController _medicationNoteController =
//   //     MedicationControllerData().medicationNoteController;

//   late FocusNode focusNode_dosage;
//   late FocusNode focusNode_totalPill;
//   late FocusNode focusNode_note;

//   @override
//   void initState() {
//     super.initState();
//     // widget._getInitialInfo();
//     focusNode_dosage = FocusNode();
//     focusNode_note = FocusNode();
//     focusNode_totalPill = FocusNode();
//   }

//   // void goToNextPage() {
//   //   if (_medicationDosageController.text.isEmpty) {
//   //     focusNode_dosage.requestFocus();
//   //   } else {
//   //     if (_medicationCountController.text.isNotEmpty &&
//   //         int.parse(_medicationCountController.text) <
//   //             int.parse(_medicationDosageController.text)) {
//   //       ScaffoldMessenger.of(context).showSnackBar(
//   //         SnackBar(
//   //           backgroundColor: Color.fromARGB(255, 7, 83, 96),
//   //           behavior: SnackBarBehavior.floating,
//   //           content: Text(
//   //             translation(context).apcGd,
//   //           ),
//   //         ),
//   //       );
//   //     } else {
//   //       Navigator.push(
//   //         context,
//   //         MaterialPageRoute(
//   //           builder: (context) => const AddMedication3(),
//   //         ),
//   //       );
//   //     }
//   //   }
//   // }

//   @override
//   Widget build(BuildContext context) {
//     // widget._getInitialInfo();
//     return Scaffold(
//       appBar: AppBar(
//         title: Text(
//           // translation(context).addMed,
//           "Systolique",
//           style: TextStyle(
//             color: Colors.black,
//             fontWeight: FontWeight.w600,
//           ),
//         ),
//         elevation: 5,
//       ),
//       body: Form(
//         key: _formKey,
//         child: Padding(
//           padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
//           child: ListView(
//             children: [
//               Text(
//                 translation(context).dpi,
//                 style: TextStyle(
//                     color: Colors.black,
//                     fontSize: 18,
//                     fontWeight: FontWeight.w600),
//               ),
//               const SizedBox(height: 20),
//               //dosage
//               Text_Field(
//                   label: translation(context).count,
//                   hint: '1',
//                   isPassword: false,
//                   keyboard: TextInputType.number,
//                   txtEditController: _medicationDosageController,
//                   focusNode: focusNode_dosage),
//               const SizedBox(height: 20),
//               Container(
//                 margin: const EdgeInsets.all(10),
//                 width: double.infinity,
//                 height: 2,
//                 color: Colors.grey.shade300,
//               ),
//               const SizedBox(height: 20),
//               //total pill count
//               Row(
//                 children: [
//                   Text(
//                     translation(context).apc,
//                     style: TextStyle(
//                         color: Colors.black,
//                         fontSize: 18,
//                         fontWeight: FontWeight.w600),
//                   ),
//                   Text(
//                     translation(context).optional,
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 15,
//                     ),
//                   ),
//                 ],
//               ),
//               SizedBox(height: 20),
//               Text_Field(
//                 label: translation(context).tpc,
//                 hint: '30',
//                 isPassword: false,
//                 keyboard: TextInputType.number,
//                 txtEditController: _medicationCountController,
//                 focusNode: focusNode_totalPill,
//               ),
//               const SizedBox(height: 20),
//               Container(
//                 margin: const EdgeInsets.all(10),
//                 width: double.infinity,
//                 height: 2,
//                 color: Colors.grey.shade300,
//               ),
//               const SizedBox(height: 20),
//               //user note
//               Row(
//                 children: [
//                   Text(
//                     translation(context).medNote,
//                     style: TextStyle(
//                         color: Colors.black,
//                         fontSize: 18,
//                         fontWeight: FontWeight.w600),
//                   ),
//                   Text(
//                     translation(context).optional,
//                     style: TextStyle(
//                       color: Colors.black,
//                       fontSize: 15,
//                     ),
//                   ),
//                 ],
//               ),
//               const SizedBox(height: 16),
//               Text_Field(
//                 label: translation(context).medNote,
//                 hint: translation(context).ufi,
//                 isPassword: false,
//                 keyboard: TextInputType.name,
//                 txtEditController: _medicationNoteController,
//                 focusNode: focusNode_note,
//               ),
//               const SizedBox(height: 40),
//               SizedBox(
//                 width: MediaQuery.of(context).size.width * 0.42,
//                 height: 55,
//                 child: FilledButton(
//                   onPressed: goToNextPage,
//                   style: const ButtonStyle(
//                     elevation: MaterialStatePropertyAll(2),
//                     shape: MaterialStatePropertyAll(
//                       RoundedRectangleBorder(
//                         borderRadius: BorderRadius.all(
//                           Radius.circular(20),
//                         ),
//                       ),
//                     ),
//                   ),
//                   child: Text(
//                     translation(context).next,
//                     style: GoogleFonts.roboto(
//                       fontSize: 20,
//                       fontWeight: FontWeight.w600,
//                     ),
//                   ),
//                 ),
//               ),
//               // const SizedBox(height: 24),
//               // ElevatedButton(
//               //   onPressed: () async {
//               //     Navigator.push(
//               //       context,
//               //       MaterialPageRoute(
//               //         builder: (context) => const AddMedication3(),
//               //       ),
//               //     );
//               //     //Print in Debug Console
//               //     print(_medicationDosageController.text);
//               //     print(_medicationCountController.text);
//               //     print(_medicationNoteController.text);
//               //   },
//               //   child: Text('Next'),
//               // ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
