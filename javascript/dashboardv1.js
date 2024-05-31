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
    document.querySelector('.bloguploadbtn');
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
            const thumbnailImage = doc.getElementById('thumbnailimage').src;
            const authorprofile = doc.querySelector('.authorprofile').src;
            const authorname = doc.querySelector('.authorname').innerText;
            const tagbutton = doc.querySelector('.tagbutton').innerText;
            // Get the current timestamp
            const timestamp = new Date().getTime();



            // Function to get the first 40 words of a text
            function getFirst40Words(text) {
                if (typeof text !== 'string' || text.trim() === '') {
                    return '';
                }
                const words = text.split(' ');
                const first40Words = words.slice(0, 40).join(' ');
                return first40Words;
            }

            
            first40wordsofblogcont = getFirst40Words(mainBlogContent);



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
                        saveFileToDatabase(file.name, tagbutton, downloadURL, first40wordsofblogcont, fileName, authorname, authorprofile, thumbnailImage, timestamp);

                        // Upload file to GitHub
                        uploadFileToGitHub(fileName, content);
                    });
                }
            );
        };

        reader.readAsText(file);
    }
}

function saveFileToDatabase(fileName, tagbutton, downloadURL, first40wordsofblogcont, title, authorname, authorprofile, thumbnailURL, timestamp) {
    // Save file details to the Firebase database
    const filesRef = database.ref(); // Reference to the root
    filesRef.push({
        // fileName: fileName,
        title: title,
        tagbutton: tagbutton,
        authorname: authorname,
        timestamp: timestamp,
        mainBlogContent: first40wordsofblogcont,
        authorprofile: authorprofile,
        downloadURL: downloadURL,
        Githuburl: "narrativenook.github.io/blogs/" + fileName,
        thumbnailURL: thumbnailURL
    });
}



async function uploadFileToGitHub(fileName, content) {
    const apiUrl = `https://api.github.com/repos/${githubUsername}/${githubRepo}/contents/blogs/${fileName}.html`;

    function base64EncodeUnicode(str) {
        const uint8Array = new TextEncoder().encode(str);
        let binary = '';
        const len = uint8Array.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        return btoa(binary);
    }

    const base64Content = base64EncodeUnicode(content);

    try {
        console.log("Uploading to GitHub...");
        console.log("API URL: ", apiUrl);

        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload ${fileName}.html`,
                content: base64Content, // Encode file content as base64
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
