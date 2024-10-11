async function summarisetheblog() {
    const systemPromptInput = "You are an AI who provides a concise and insightful summary of the blog article in a \"single paragraph\" and in under strict limit of : '100-words only', ensuring that all key points are covered without sacrificing clarity or brevity. I will prioritize the preservation of the original text's essence and brevity, resulting in a summary that is both informative and engaging, along with by using easy and understandable English. Here is the article summarise it according to my needs and make sure don't write 'Summary:' on starting and also don't use '*' anywhere!";
    const queryInput = document.getElementById("mainblogcontent");
    const responseOutput = document.querySelector('.aisummarisedcontent');
    const aisummarisingbutton = document.querySelector('.aisummarisingbutton');

    const apiKey = "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";
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";
    const model = "llama3-8b-8192";

    try {
        aisummarisingbutton.style.display = 'none';
        const messages = [
            {
                "role": "system",
                "content": systemPromptInput,
            },
            {
                "role": "user",
                "content": queryInput.textContent,
            },
        ];

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                "messages": messages,
                "model": model,
            }),
        });

        const responseData = await response.json();
        const generatedText = responseData.choices[0].message.content;

        // Typing animation function
        async function typeWriter(text) {
            for (let i = 0; i < text.length; i++) {
                responseOutput.textContent += text.charAt(i);
                await new Promise(resolve => setTimeout(resolve, 1)); // Adjust speed here (milliseconds)
            }
        }

        // Clear existing content
        responseOutput.textContent = '';

        // Start typing animation
        await typeWriter(generatedText);
    } catch (error) {
        console.error(error);
        responseOutput.textContent = "Error: Could not communicate with Hyper model. or maybe there is a lot of traffic in Ai Summary Generation ! Try Again In Couple of minutes .";
    }
}













// from here we will start the code of the main databaze connection from our blog article 

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


        // Function to find the blog post ID based on its title
        function findBlogPostIdByTitle(title) {
            // Reference to the root of the database
            const rootRef = database.ref();

            // Query to find the blog post with the given title
            return rootRef.once('value').then(snapshot => {
                const posts = snapshot.val();
                for (const postId in posts) {
                    const post = posts[postId];
                    if (post.title === title) {
                        return postId;
                    }
                }
                return null; // Return null if the post with the given title is not found
            });
        }

        // Function to increment the view count for a blog post
        function incrementViewCount(postId) {
            // Reference to the viewCount of the specific blog post in the database
            const viewCountRef = database.ref("/" + postId + "/" + "viewCount");

            // Increment the view count by 1
            viewCountRef.transaction(function (currentCount) {
                // Return the new value to be set in the database
                return (currentCount || 0) + 1;
            });
        }

        // When the page loads
        window.addEventListener('load', function () {
            // Get the title of the blog post
            const title = document.getElementById("titleofblog").textContent;

            // Find the blog post ID based on its title
            findBlogPostIdByTitle(title).then(postId => {
                if (postId) {
                    // Increment the view count for the blog post
                    incrementViewCount(postId);
                } else {
                    console.error("Blog post not found in the database.");
                }
            }).catch(error => {
                console.error("Error finding blog post ID:", error);
            });
        });















        // Serching Any Post Button !!!!

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
















function getCurrentURL() {
            return window.location.href;
        }

        function shareOnWhatsApp() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://api.whatsapp.com/send?text=" + url);
        }

        function shareOnInstagram() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://www.instagram.com/?url=" + url);
        }

        function shareOnFacebook() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + url);
        }

        function shareOnTelegram() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://t.me/share/url?url=" + url);
        }

        function shareOnLinkedIn() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://www.linkedin.com/shareArticle?url=" + url);
        }

        function shareOnTwitter() {
            var url = encodeURIComponent(getCurrentURL());
            window.open("https://twitter.com/intent/tweet?url=" + url);
        }

        function copyToClipboard() {
            var url = window.location.href; // Gets the current URL of the webpage

            // Check if the Clipboard API is available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    alert("URL copied to clipboard!");
                }, function () {
                    alert("Failed to copy URL to clipboard!");
                });
            } else {
                // Fallback method for browsers that do not support the Clipboard API
                var textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";  // Avoid scrolling to bottom
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    if (successful) {
                        alert("URL copied to clipboard!");
                    } else {
                        alert("Failed to copy URL to clipboard!");
                    }
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }

                document.body.removeChild(textArea);
            }
        }
