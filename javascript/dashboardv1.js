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
            const thumbnailImage = doc.getElementById('thumbnailimage').src;
            const authorprofile = doc.querySelector('.authorprofile').src;
            const authorname = doc.querySelector('.authorname').innerText;
            const tagbutton = doc.querySelector('.tagbutton').innerText;
            // Get the current timestamp
            const timestamp = new Date().getTime();

            // Upload file to storage and save details to the database
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
                    consoleoutput.innerText = "There is an error , try again after sometime .";
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        saveFileToDatabase(file.name, tagbutton, downloadURL, mainBlogContent, fileName, authorname, authorprofile, thumbnailImage, timestamp);
                        console.log('File available at', downloadURL);
                    });
                }
            );
        };

        reader.readAsText(file);
    }
}

function saveFileToDatabase(fileName, tagbutton, downloadURL, mainBlogContent, title, authorname, authorprofile, thumbnailURL, timestamp) {
    // Save file details to the database
    const filesRef = database.ref();
    filesRef.push({
        title: title,
        tagbutton: tagbutton,
        authorname: authorname,
        timestamp: timestamp,
        downloadURL: downloadURL,
        fileName: fileName,
        mainBlogContent: mainBlogContent,
        authorprofile: authorprofile,
        thumbnailURL: thumbnailURL
    });
}
