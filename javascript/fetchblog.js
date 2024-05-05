
function fetchAndDisplayRecentFiles() {
    const filesRef = database.ref();

    filesRef.orderByChild('timestamp').limitToLast(4).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {


                const latestpostsection = document.querySelector('.latestpostsection')
                latestpostsection.innerHTML = '';


                snapshot.forEach((childSnapshot) => {
                    const fileData = childSnapshot.val();



                    const allbuttons = document.createElement('div');
                    allbuttons.className = 'allbuttons';


                    const linkofblog = document.createElement('a');
                    linkofblog.className = 'linkofblog';
                    linkofblog.href = fileData.downloadURL || '';
                    linkofblog.target = '_blank';


                    const postDiv = document.createElement('div');
                    postDiv.className = 'latestpost';



                    const authordetails = document.createElement('div');
                    authordetails.className = 'authordetails';


                    const timestamp = fileData.timestamp;
                    const date = new Date(timestamp);
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0 for January)
                    const year = date.getFullYear() % 100; // Getting last two digits of the year
                    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().padStart(2, '0')}`;
                    console.log(formattedDate);
                    const timestampdisplay = document.createElement('p');
                    timestampdisplay.className = 'timestampdisplay';
                    timestampdisplay.innerText = "▪ " + formattedDate || '';



                    const authorprofile = document.createElement('img');
                    authorprofile.className = 'authorprofile';
                    authorprofile.alt = 'author profile';
                    authorprofile.src = fileData.authorprofile || '';


                    const authorname = document.createElement('p');
                    authorname.className = 'authorname';
                    authorname.style.display = "flex";
                    authorname.innerHTML = fileData.authorname || '';


                    const bannerImage = document.createElement('img');
                    bannerImage.className = 'banner';
                    bannerImage.alt = 'thumbnail';
                    bannerImage.src = fileData.thumbnailURL || '';


                    const postHeading = document.createElement('h3');
                    postHeading.className = 'postheading';
                    postHeading.innerText = fileData.title || '';


                    const sometextOfPost = document.createElement('p');
                    sometextOfPost.className = 'sometextofpost';
                    sometextOfPost.innerText = getFirst40Words(fileData.mainBlogContent);



                    const viewers = document.createElement('button');
                    viewers.className = 'viewers';

                    if (fileData.viewCount >= 1000000000) {
                        viewers.innerHTML = '<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (fileData.viewCount / 1000000000).toFixed(1) + 'B';
                    } else if (fileData.viewCount >= 1000000) {
                        viewers.innerHTML = '<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (fileData.viewCount / 1000000).toFixed(1) + 'M';
                    } else if (fileData.viewCount >= 1000) {
                        viewers.innerHTML = '<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (fileData.viewCount / 1000).toFixed(1) + 'K';
                    } else {
                        viewers.innerHTML = '<i class="fas fa-eye"></i>&nbsp;&nbsp;' + fileData.viewCount;
                    }

                    const gotoblogbutton = document.createElement('button');
                    gotoblogbutton.className = 'gotoblogbutton';
                    gotoblogbutton.innerHTML = 'Read now &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>';


                    postDiv.appendChild(bannerImage);

                    postDiv.appendChild(authordetails);
                    authordetails.appendChild(authorprofile);
                    authordetails.appendChild(authorname);
                    authordetails.appendChild(timestampdisplay);

                    postDiv.appendChild(postHeading);
                    postDiv.appendChild(sometextOfPost);

                    postDiv.appendChild(allbuttons);
                    allbuttons.appendChild(viewers);
                    allbuttons.appendChild(linkofblog);
                    linkofblog.appendChild(gotoblogbutton);

                    // Append the postDiv to the latestPostContainer
                    latestpostsection.appendChild(postDiv);

                });
            } else {
                console.log('No recent files found.');
            }
        })
        .catch((error) => {
            console.error('Error fetching recent files:', error);
        });
}



// Function to get the first 40 words of a text
function getFirst40Words(text) {
    if (typeof text !== 'string' || text.trim() === '') {
        return '';
    }
    const words = text.split(' ');
    const first40Words = words.slice(0, 40).join(' ') + " . . .";
    return first40Words;
}

fetchAndDisplayRecentFiles();