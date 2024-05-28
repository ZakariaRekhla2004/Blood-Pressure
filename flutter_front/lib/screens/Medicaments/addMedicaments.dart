import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/components/TextField.dart';
import 'package:flutter_front/components/loginWidgets/ButtonWidget.dart';
import 'package:flutter_front/models/MedicamentCategory.dart';
// import 'package:flutter_front/models/category.dart';
import 'package:flutter_front/screens/home/views/home.dart';
// import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AddMedication extends StatefulWidget {
  List<CategoryModel2> categories = [];
void _getInitialInfo() {
    categories = CategoryModel2.getCategories();
  }
  @override
  _AddMedicationState createState() => _AddMedicationState();
}


class _AddMedicationState extends State<AddMedication> {
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  late TextEditingController nomController;
  late TextEditingController dozeController;
  late TextEditingController mg_gController;
  late TextEditingController qrController;
  late TextEditingController _medicationTypeController ;
    File? _image;
  int _selectedCategoryIndex = -1;
  // final ImagePicker _picker = ImagePicker();

  final List<String> _times = ['Morning', 'Afternoon', 'Evening'];
  List<String> _selectedTimes = [];
 
  @override
  void initState() {
    super.initState();
    widget._getInitialInfo();
    nomController = TextEditingController();
    dozeController = TextEditingController();
    mg_gController = TextEditingController();
    qrController = TextEditingController();
    _medicationTypeController = TextEditingController();
  }
   

  @override
  void dispose() {
    nomController.dispose();
    dozeController.dispose();
    mg_gController.dispose();
    qrController.dispose();
    _medicationTypeController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    // final pickedFile = await _picker.getImage(source: ImageSource.camera);

    // setState(() {
    //   if (pickedFile != null) {
    //     _image = File(pickedFile.path);
    //   } else {
    //     print('No image selected.');
    //   }
    // });
  }

  Future<void> _saveMedication() async {
    setState(() {
      _isLoading = true;
    });

    SharedPreferences localStorage = await SharedPreferences.getInstance();
    var id = localStorage.getString('id');
    print(id);

    var data = {
      "Nom": nomController.text,
      "Doze": dozeController.text,
      "Mg_g": mg_gController.text,
      "MedicationType": _medicationTypeController.text,
      // "Qr": _image != null ? base64Encode(_image!.readAsBytesSync()) : null,
      "Temps": _selectedTimes,
    };
    print(data);

    // var res = await Network().authData({
    //   "medications": [
    //     data,
    //   ]
    // }, '/dossier/AddMedicament');
    // var body = json.decode(res.body);
    // print(body);

    // if (res.statusCode == 201) {
    //   Navigator.pushReplacement(
    //     context,
    //     MaterialPageRoute(builder: (context) => Home()),
    //   );
    // }

    setState(() {
      _isLoading = false;
    });
  }

  Widget buildTextField(String label, String hint,
      TextEditingController controller, TextInputType keyboard) {
    return Text_Field(
      label: label,
      hint: hint,
      isPassword: false,
      keyboard: keyboard,
      txtEditController: controller,
      onChanged: (value) {
        controller.text = value;
      },
    );
  }

  Widget buildSubmitButton() {
    return SizedBox(
      width: MediaQuery.of(context).size.width * 0.42,
      height: 55,
      child: CustomButton(
        onPressed: _saveMedication,
        title: _isLoading ? 'Saving...' : 'Save Medication',
        color: Colors.blue.shade900,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // widget._getInitialInfo();
    return Scaffold(
      backgroundColor: Color(0xFFF6F7FB),
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text(
          "Add Medicament",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        elevation: 0,
      ),
      body: Form(
        key: _formKey,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
          child: ListView(
            children: [
              const SizedBox(height: 5),
              buildTextField(
                  'Nom', 'Enter Nom', nomController, TextInputType.text),
              const SizedBox(height: 15),
              Row(
                children: [
                  Expanded(
                    child: buildTextField('Doze', 'Enter Doze', dozeController,
                        TextInputType.number),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: buildTextField('Mg_g', 'Enter Mg_g', mg_gController,
                        TextInputType.number),
                  ),
                ],
              ),
              const SizedBox(height: 15),
              SizedBox(
                height: 120,
                child: ListView.builder(
                  itemCount: widget.categories.length,
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.only(
                          right: 20), // Adjust the right padding for space
                      child: InkWell(
                        onTap: () {
                          setState(() {
                            if (_selectedCategoryIndex == index) {
                              // If the same category is tapped again, deselect it
                              // _selectedCategoryIndex = -1;
                              // _medicationTypeController.text = '';
                            } else {
                              // Deselect the previously selected category
                              if (_selectedCategoryIndex != -1) {
                                widget.categories[_selectedCategoryIndex]
                                        .boxColor =
                                    const Color.fromARGB(255, 158, 158, 158);
                                widget.categories[_selectedCategoryIndex]
                                    .isSelected = false;
                              }

                              // Select the tapped category
                              _selectedCategoryIndex = index;
                              _medicationTypeController.text =
                                  widget.categories[index].name;
                              widget.categories[index].boxColor =
                                  const Color.fromARGB(255, 7, 82, 96)
                                      .withOpacity(0.3);
                              widget.categories[index].isSelected = true;

                              print(_medicationTypeController.text);
                            }
                          });
                        },
                        child: Container(
                          width: 100,
                          decoration: BoxDecoration(
                            color: widget.categories[index].boxColor
                                .withOpacity(0.3),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Container(
                                width: 70,
                                height: 70,
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(10.0),
                                  child: Image.asset(
                                    widget.categories[index].iconPath,
                                  ),
                                ),
                              ),
                              Text(
                                widget.categories[index].name,
                                style: const TextStyle(
                                  fontWeight: FontWeight.w400,
                                  color: Colors.black,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20), 

              Text(
                'Select Times :', // Ajoutez votre texte ici
                style: TextStyle(
                  color: Color.fromARGB(255, 71, 67, 67),
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 16),
              ..._times.map((time) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 1.0),
                  child: CheckboxListTile(
                    title: Text(
                      time,
                      style: TextStyle(fontSize: 18),
                    ),
                    value: _selectedTimes.contains(time),
                    onChanged: (bool? value) {
                      setState(() {
                        if (value == true) {
                          _selectedTimes.add(time);
                        } else {
                          _selectedTimes.remove(time);
                        }
                      });
                    },
                    activeColor: Colors.blueAccent,
                    checkColor: Colors.white,
                    controlAffinity: ListTileControlAffinity.leading,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                );
              }).toList(),
              const SizedBox(height: 15),
              Text(
                'QR or Picture of Medicament :', // Ajoutez votre texte ici
                style: TextStyle(
                  color: Color.fromARGB(255, 71, 67, 67),
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 10),
              _image == null ? Text('No image selected.') : Image.file(_image!),
              const SizedBox(height: 10),
              ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(
                      Color.fromARGB(255, 140, 187, 225)),
                  padding: MaterialStateProperty.all(
                      EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0)),
                  shape: MaterialStateProperty.all(RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  )),
                ),
                onPressed: _pickImage,
                child: Text(
                  'Take Picture',
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(height: 25),
              buildSubmitButton(),
            ],
          ),
        ),
      ),
    );
  }
}
