import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/screens/Appointment/addAppointment.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Listappointment extends StatefulWidget {
  @override
  _ListappointmentState createState() => _ListappointmentState();
}

class _ListappointmentState extends State<Listappointment> {
  Future<List<dynamic>> fetchData() async {
    var res = await Network().getData('/apppoint/getAppointment');
    print( json.decode(res.body));
    if (res.statusCode == 200) {
      return json.decode(res.body);
    } else {
      throw Exception('Failed to load appointments');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF6F7FB),
      appBar: AppBar(
        backgroundColor: Colors.blueAccent,
        title: Text(
          "Appointments",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        elevation: 0,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchData(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            List<dynamic> appointments = snapshot.data ?? [];
            List<Widget> waitingAppointments = [];
            List<Widget> acceptedAppointments = [];
            List<Widget> rejectedAppointments = [];

            for (var appointment in appointments) {
              Widget row = BuildRow(
                date: appointment['date'],
                time: appointment['heure'],
                status: appointment['status'],
              );
              if (appointment['status'] == 'Waiting') {
                waitingAppointments.add(row);
              } else if (appointment['status'] == 'Accept') {
                acceptedAppointments.add(row);
              } else if (appointment['status'] == 'Reject') {
                rejectedAppointments.add(row);
              }
            }

            return SingleChildScrollView(
              padding: EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildStatusSection(
                      context, "Waiting Appointments", waitingAppointments),
                  SizedBox(height: 10.0),
                  _buildStatusSection(
                      context, "Accepted Appointments", acceptedAppointments),
                  SizedBox(height: 10.0),
                  _buildStatusSection(
                      context, "Rejected Appointments", rejectedAppointments),
                ],
              ),
            );
          }
        },
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 5),
        child: FloatingActionButton(
          onPressed: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => Appointment(0)),
            );
          },
          backgroundColor: Colors.blueAccent,
          child: Icon(
            Icons.add,
            size: 30,
            color: Color.fromARGB(255, 203, 226, 231),
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
    );
  }

  Widget _buildStatusSection(
      BuildContext context, String title, List<Widget> rows) {
    return Card(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.blueAccent,
                  ),
            ),
            Divider(
              color: Colors.grey[300],
              height: 20,
              thickness: 1,
            ),
            Column(children: rows),
          ],
        ),
      ),
    );
  }
}

class BuildRow extends StatelessWidget {
  final String date;
  final String time;
  final String status;

  BuildRow({required this.date, required this.time, required this.status});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(date),
        Text(time),
        Text(status),
      ],
    );
  }
}

