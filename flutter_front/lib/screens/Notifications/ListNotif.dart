// import 'package:flutter/material.dart';
// import 'package:flutter_front/components/NotificationWidget.dart';
// import 'package:flutter_front/models/Notification.dart';

// class NotificationList extends StatefulWidget {
//   @override
//   _NotificationListState createState() => _NotificationListState();
// }

// class _NotificationListState extends State<NotificationList> {
//   final List<NotificationModel> _notifications = [
//     NotificationModel(title: 'New Appointment', message: 'You have a new appointment.' , isRead: true),
//     NotificationModel(title: 'Medication Reminder', message: 'Time to take your medication.' , isRead:false),
//     // Add more notifications here
//   ];

//   @override
//   Widget build(BuildContext context) {
//     return ListView.builder(
//       itemCount: _notifications.length,
//       itemBuilder: (context, index) {
//         return NotificationItem(
//           notification: _notifications[index],
//           onTap: () => _handleNotificationTap(index),
//         );
//       },
//     );
//   }

//   void _handleNotificationTap(int index) {
//     setState(() {
//       _notifications[index].isRead = true;
//     });
//   }
// }
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_front/api/auth.dart';
import 'package:flutter_front/components/NotificationWidget.dart';
import 'package:flutter_front/models/Notification.dart';
class NotificationScreen extends StatefulWidget {
  @override
  _NotificationScreenState createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  late Future<List<NotificationItem>> _futureNotifications;

  @override
  void initState() {
    super.initState();
    _futureNotifications = fetchNotifications();
  }

  Future<List<NotificationItem>> fetchNotifications() async {
    var res = await Network().getData('/Notifications/getNotifications');
    if (res.statusCode == 200) {
      List<dynamic> data = json.decode(res.body)['notification'];
      print(data.map((item) => NotificationItem.fromJson(item)).toList());
      return data.map((item) => NotificationItem.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load notifications');
    }
  }

  void _handleNotificationTap(int index, List<NotificationItem> notifications) async {
  try {
    var res = await Network().getData('/Notifications/updateNotification?id=${notifications[index].id}');
      print(res.body);
    
    if (res.statusCode == 200) {
      setState(() {
        notifications[index].isRead = true;
      });
      print(res.body);
    } else {
      throw Exception('Failed to update notification status');
    }
  } catch (e) {
    print('Error updating notification status: $e');
    
}



  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifications'),
      ),
      body: FutureBuilder<List<NotificationItem>>(
        future: _futureNotifications,
        builder: (context, snapshot) {
          print(snapshot);
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Failed to load notifications'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No notifications available'));
          } else {
            return NotificationList(
              notifications: snapshot.data!,
              onNotificationTap: (index) => _handleNotificationTap(index, snapshot.data!),
            );
          }
        },
      ),
    );
  }
}