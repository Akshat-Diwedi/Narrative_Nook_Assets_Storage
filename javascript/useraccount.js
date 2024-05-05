// Function to generate a random alphanumeric code
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

const toggleBtn = document.getElementById("toggle-btn");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

toggleBtn.addEventListener("click", function () {
    if (loginForm.style.display === "none") {
        // Show login form and hide signup form
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
        toggleBtn.textContent = "Switch to Signup";
    } else {
        // Show signup form and hide login form
        loginForm.style.display = "none";
        signupForm.style.display = "flex";
        toggleBtn.textContent = "Switch to Login";
    }
});

function openaccountpanel() {
    document.querySelector('.useraccountbox').style.display = "block";
}

function closeaccountpanel() {
    document.querySelector('.useraccountbox').style.display = "none";
}

function openloginsignupbox() {
    document.querySelector('.loginsignupbox').style.display = "block";
}

function closeloginsignupbox() {
    document.querySelector('.loginsignupbox').style.display = "none";
}

document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("login-name").value;
    const phone = document.getElementById("login-phone").value;
    const email = document.getElementById("login-email").value;

    // Check if the account exists in Firebase
    database.ref('users').orderByChild('name').equalTo(name).once('value', function (snapshot) {
        if (snapshot.exists()) {
            // Check if the retrieved user has the same phone and email
            snapshot.forEach(function (childSnapshot) {
                const userData = childSnapshot.val();
                if (userData.phone === phone && userData.email === email) {
                    // If phone and email match, login the user
                    const userId = childSnapshot.key;
                    localStorage.setItem('nameofuser', userData.name);
                    localStorage.setItem('phoneofuser', userData.phone);
                    localStorage.setItem('emailofuser', userData.email);
                    localStorage.setItem('profilepic', userData.profilePic);
                    localStorage.setItem('userCode', userId);
                    window.location.href = "index.html";
                }
            });
        } else {
            alert('No Account Exists!');
        }
    });
});

document.getElementById("signup-btn").addEventListener("click", function (event) {
    event.preventDefault();
    const profilePicFile = document.getElementById("signup-profile-pic").files[0];
    const name = document.getElementById("signup-name").value;
    const phone = document.getElementById("signup-phone").value;
    const email = document.getElementById("signup-email").value;

    const reader = new FileReader();
    reader.onload = function (event) {
        const profilePicBase64 = event.target.result;

        // Generate a random 10-digit alphanumeric code
        const userId = generateRandomCode(10);

        // Store profile picture as base64 URL in the database
        database.ref('users/' + userId).set({
            name: name,
            phone: phone,
            email: email,
            profilePic: profilePicBase64
        }).then(function () {
            // Store user details in local storage
            localStorage.setItem('nameofuser', name);
            localStorage.setItem('phoneofuser', phone);
            localStorage.setItem('emailofuser', email);
            localStorage.setItem('profilepic', profilePicBase64);
            localStorage.setItem('userCode', userId);
            window.location.href = "index.html";
        }).catch(function (error) {
            alert("Error creating account: ", error)
        });
    };

    reader.readAsDataURL(profilePicFile);
});

// Display user details if available in local storage
var userprofileimage = document.querySelector('.userprofileimage');
var usernamedisplay = document.querySelector('.usernamedisplay');
var useremaildisplay = document.querySelector('.useremaildisplay');

if (localStorage.getItem("profilepic")) {
    userprofileimage.src = localStorage.getItem("profilepic");
}
if (localStorage.getItem("nameofuser")) {
    usernamedisplay.innerText = localStorage.getItem("nameofuser");
}
if (localStorage.getItem("emailofuser")) {
    useremaildisplay.innerText = localStorage.getItem("emailofuser");
}


















// author follow functions logic starts here !!!!

// Function to follow an author
function followAuthor(authorName) {
    const userCode = localStorage.getItem('userCode'); // Retrieve user code from local storage
    if (!userCode) {
        alert("Please log in to follow authors.");
        return;
    }

    // Retrieve followed authors from the database or initialize an empty array if not exist
    const followedAuthorsRef = database.ref('users/' + userCode + '/followed');
    followedAuthorsRef.once('value', function (snapshot) {
        let followedAuthors = snapshot.val() || [];

        // Check if the author is already followed
        if (followedAuthors.includes(authorName)) {
            const buttonId = 'follow-' + authorName.toLowerCase().replace(/\s+/g, '-'); // Construct button ID
            const followButton = document.getElementById(buttonId);
            followButton.textContent = "Following";
            alert('You are already following ' + authorName);
        } else {
            // Add the author to the followed authors list
            followedAuthors.push(authorName);

            // Update the followed authors list in the database
            followedAuthorsRef.set(followedAuthors)
                .then(function () {
                    alert('You are now following ' + authorName);
                    // Change button text to "Following"
                    const buttonId = 'follow-' + authorName.toLowerCase().replace(/\s+/g, '-'); // Construct button ID
                    const followButton = document.getElementById(buttonId);
                    if (followButton) {
                        followButton.textContent = "Following";
                    }
                })
                .catch(function (error) {
                    alert('Error following ' + authorName + ': ' + error);
                });
        }
    });
}
