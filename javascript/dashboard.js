const narrativenookdb = {
    apiKey: "AIzaSyBT83VS7o8MA3ubKyoAXKPVQa1CWoLL6LI",
    authDomain: "narrativenook-40358.firebaseapp.com",
    databaseURL: "https://narrativenook-40358-default-rtdb.firebaseio.com",
    projectId: "narrativenook-40358",
    storageBucket: "narrativenook-40358.appspot.com",
    messagingSenderId: "1032023991463",
    appId: "1:1032023991463:web:589f6184eb5f67dabee782",
    measurementId: "G-5584VC76KY"
};

firebase.initializeApp(narrativenookdb);
const database = firebase.database();
const storage = firebase.storage();


// GitHub configuration
const githubToken = "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";
const githubUsername = "narrativenook";
const githubRepo = "narrativenook.github.io";

function uploadFile() {
    const fileInput = document.getElementById('takehtmlfilefromuser');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const consoleoutput = document.getElementById('consoleoutput');
            const content = e.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');

            // Extract relevant information from the HTML code
            const mainBlogContent = doc.getElementById('mainblogcontent').innerHTML;
            const fileName = doc.getElementById('titleofblog').innerText;
            const tagbutton = doc.querySelector('.tagbutton').innerText;

            // Upload file to Firebase storage
            const storageRef = storage.ref().child(file.name);
            const uploadTask = storageRef.put(file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Uploading : ${progress}%`);
                    consoleoutput.innerText = "Upload is " + progress + "% done";
                },
                (error) => {
                    console.log(error);
                    consoleoutput.innerText = "There is an error, try again after some time.";
                },
                () => {
                    // Once uploaded to Firebase, get download URL
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        // Save file details to Firebase database
                        saveFileToDatabase(fileName, tagbutton, downloadURL);

                        // Upload file to GitHub
                        uploadFileToGitHub(fileName, content);
                    });
                }
            );
        };

        reader.readAsText(file);
    }
}

function saveFileToDatabase(fileName, tagbutton, downloadURL) {
    // Save file details to the Firebase database
    const filesRef = database.ref(); // Reference to the root
    const blogRef = filesRef.child(fileName); // Child reference with blog title as key
    blogRef.set({
        viewCount: 0,
        tagbutton: tagbutton,
        Githuburl: "narrativenook.github.io/blogs" + fileName,
        downloadURL: downloadURL
    });
}

async function uploadFileToGitHub(fileName, content) {
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/blogs/${fileName}.html`;

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload ${fileName}.html`,
                content: btoa(content), // Encode file content as base64
            }),
        });

        if (response.ok) {
            console.log("File uploaded to GitHub successfully!");
        } else {
            const errorMessage = await response.text();
            console.error("Error uploading file to GitHub:", errorMessage);
        }
    } catch (error) {
        console.error("Error uploading file to GitHub:", error);
    }
}
