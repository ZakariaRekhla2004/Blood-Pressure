class NotificationItem {
  final String id;
  final String sender;
  final String recever;
  final String message;
  final String appointId;
  bool isRead;
  final DateTime updatedAt;
  final DateTime createdAt;
  final String title;

  NotificationItem({
    required this.id,
    required this.sender,
    required this.recever,
    required this.message,
    required this.appointId,
    required this.isRead,
    required this.updatedAt,
    required this.createdAt,
    required this.title,
  });

  factory NotificationItem.fromJson(Map<String, dynamic> json) {
    return NotificationItem(
      id: json['_id'],
      sender: json['sender'],
      recever: json['recever'],
      message: json['message'],
      appointId: json['appoint_id'],
      isRead: json['read'],
      updatedAt: DateTime.parse(json['updated_at']),
      createdAt: DateTime.parse(json['created_at']),
      title: json['title'],
    );
  }
}