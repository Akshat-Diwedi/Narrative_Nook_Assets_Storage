function checkWidthAndStyle() {
  var link = document.querySelector('link[rel="stylesheet"]');
  if (document.body.offsetWidth > 500) {
    link.setAttribute('href', 'style.css');
  } else if (document.body.offsetWidth <= 500) {
    link.setAttribute('href', 'mobilestyle.css');
  } else {
    console.log("Something went wrong!");
  }
}

checkWidthAndStyle();
window.addEventListener('resize', function () {
  checkWidthAndStyle();
});








document.addEventListener("DOMContentLoaded", function () {
  const notificationAccess = document.getElementById("notification-access");
  const allowButton = document.getElementById("allow-notifications");
  const closebutton = document.querySelector('.closebutton');

  // Check if the browser supports notifications
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      notificationAccess.style.display = "block";

      allowButton.addEventListener("click", function () {
        Notification.requestPermission().then(function (permission) {
          console.log("Permission status:", permission); // Debugging statement
          if (permission === "granted") {
            notificationAccess.style.display = "none";
          }
        });
      });

      closebutton.addEventListener("click", function () {
        notificationAccess.style.display = "none";
      });

    } else {
      // Debugging statement
      console.log("Notification permission already granted:", Notification.permission);
    }
  } else {
    // Debugging statement
    console.log("Browser does not support notifications");
  }
});
