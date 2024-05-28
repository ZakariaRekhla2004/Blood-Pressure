// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

// / Default [FirebaseOptions] for use with your Firebase apps.
// /
// / Example:
// / ```dart
// / import 'firebase_options.dart';
// / // ...
// / await Firebase.initializeApp(
// /   options: DefaultFirebaseOptions.currentPlatform,
// / );
// / ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError(
        'DefaultFirebaseOptions have not been configured for web - '
        'you can reconfigure this by running the FlutterFire CLI again.',
      );
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyC_qmoUNqQprMHKgIMpxr5Dhj6xTHHDCHE',
    appId: '1:664158563402:android:b126c93ba1d627f0a00ab3',
    messagingSenderId: '664158563402',
    projectId: 'bp-tracker-b9ad0',
    storageBucket: 'bp-tracker-b9ad0.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAhcDEykPDD-CbhZ0X-MADUwlamm3HNUck',
    appId: '1:664158563402:ios:3606f3dd9e9ad031a00ab3',
    messagingSenderId: '664158563402',
    projectId: 'bp-tracker-b9ad0',
    storageBucket: 'bp-tracker-b9ad0.appspot.com',
    iosBundleId: 'com.example.flutterFront',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAhcDEykPDD-CbhZ0X-MADUwlamm3HNUck',
    appId: '1:664158563402:ios:3606f3dd9e9ad031a00ab3',
    messagingSenderId: '664158563402',
    projectId: 'bp-tracker-b9ad0',
    storageBucket: 'bp-tracker-b9ad0.appspot.com',
    iosBundleId: 'com.example.flutterFront',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyAyzH9HeQIS5ea14pZ2fg-3pXBNZLudgvk',
    appId: '1:664158563402:web:37a56ad1d9ae84cfa00ab3',
    messagingSenderId: '664158563402',
    projectId: 'bp-tracker-b9ad0',
    authDomain: 'bp-tracker-b9ad0.firebaseapp.com',
    storageBucket: 'bp-tracker-b9ad0.appspot.com',
    measurementId: 'G-7C0D8SBDBD',
  );

}