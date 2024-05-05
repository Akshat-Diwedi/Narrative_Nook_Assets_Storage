function checkWidthAndStyle() {
  var link = document.querySelector('link[rel="stylesheet"]');
  if (document.body.offsetWidth > 500) {
    link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/css/stylev1.css');
  } else if (document.body.offsetWidth <= 500) {
    link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/css/mobilestylev1.css');
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
    setTimeout(function() {
      if (Notification.permission === 'granted') {
        console.log("Notification permission already granted.");
        // Don't show the popup if the permission is already granted
        notificationAccess.style.display = "none";
      } else {
        notificationAccess.style.display = "block";

        allowButton.addEventListener("click", function () {
          Notification.requestPermission().then(function (permission) {
            console.log("Permission status:", permission);
            if (permission === "granted") {
              notificationAccess.style.display = "none";
            }
          });
        });

        closebutton.addEventListener("click", function () {
          notificationAccess.style.display = "none";
        });
      }
    }, 10000); // wait 10 seconds before showing the popup
  } else {
    console.log("Browser does not support notifications");
  }
});
