import Vue from "nativescript-vue";
import Home from "./components/Home";

import { firebase } from "@nativescript/firebase"
import { messaging, Message } from "@nativescript/firebase/messaging";

firebase.init({

}).then(
    function () {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
);

messaging.registerForPushNotifications({
    onPushTokenReceivedCallback: (token) => {
        console.log("Firebase plugin received a push token: " + token);
    },

    onMessageReceivedCallback: (message) => {
        console.log("Push message received: " + message.title);

        let contentId = null;
        let contentType = null;

        /** if the app is already open, show a dialog message**/
        if (message.foreground) {
            confirm({
                title: message.title,
                message: message.body,
                okButtonText: "open",
                neutralButtonText: "cancel"
            }).then(function (result) {
                if (result) {
                    if (message.data.contentId && message.data.contentType) {
                        contentId = message.data.contentId;
                        contentType = message.data.contentType;
                    }
                }

                console.log("Dialog result: " + result);
            });
        }
    },

    // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
    showNotifications: true,

    // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
    showNotificationsWhenInForeground: true

}).then(() => console.log("Registered for push"));

new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
