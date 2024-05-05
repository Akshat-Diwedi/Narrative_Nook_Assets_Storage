function enableSearchButton() {
    var searchText = document.querySelector('.postsearch').value.trim();
    var searchButton = document.getElementById('searchButton');
    if (searchText !== "") {
        searchButton.removeAttribute('disabled');
        var searchResultsDiv = document.querySelector('.searchresults');
        searchResultsDiv.style.display = "block";
        searchResultsDiv.style.transition = "0.2s ease-in-out";

    } else {
        var searchResultsDiv = document.querySelector('.searchresults');
        searchResultsDiv.style.display = "none";
        searchResultsDiv.style.transition = "0.2s ease-in-out";
        searchButton.setAttribute('disabled', 'disabled');
    }
}

// Function to handle key press events
function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchpost();
    }
}

// Function to search posts
function searchpost() {

    var searchText = document.querySelector('.postsearch').value.trim().toLowerCase();
    var searchResultsDiv = document.querySelector('.searchresults');

    searchResultsDiv.innerHTML = '';
    searchResultsDiv.style.display = "block";
    var dbRef = firebase.database().ref();

    dbRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var post = childSnapshot.val();
            var title = (post.title || "").toLowerCase();
            var downloadURL = (post.downloadURL || "").toLowerCase();            

            if (title.includes(searchText) || downloadURL.includes(searchText)) {
                displayPost(post);
            }
        });
    });
}

function displayPost(post) {
    var searchResultsDiv = document.querySelector('.searchresults');

    var searchpostDiv = document.createElement('div');
    searchpostDiv.classList.add('post');

    var titleHeading = document.createElement('h2');
    titleHeading.textContent = post.title;

    var readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.onclick = function () {
        window.open(post.downloadURL, '_blank');
    };

    readButton.addEventListener('click', () => {
        const viewCountRef = childSnapshot.ref.child('viewCount');
        viewCountRef.transaction((currentCount) => {
            return (currentCount || 0) + 1;
        }).then(() => {
            window.open(fileData.downloadURL || '', '_blank');
        });
    });

    // Append elements to the post div
    searchpostDiv.appendChild(titleHeading);
    searchpostDiv.appendChild(readButton);
    searchResultsDiv.appendChild(searchpostDiv);
}
