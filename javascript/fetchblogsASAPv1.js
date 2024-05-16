function fetchAndDisplayRecentFiles() {
    const latestpostsection = $('.latestpostsection');
    latestpostsection.empty(); // Clear existing content

    $.ajax({
        url: 'https://narrativenook.github.io/blogs/', // Path to the folder containing your blog articles
        success: function(data) {
            $(data).find('a').each(function() { // Iterate over all links in the folder
                const filename = $(this).attr('href');
                if (filename.endsWith('.html')) { // Assuming blog articles are HTML files
                    const articleUrl = filename; // Construct the URL for individual blog article
                    $.ajax({
                        url: articleUrl,
                        dataType: 'html',
                        success: function(article) {
                            const fileData = $(article); // Convert article HTML string to jQuery object
                            const postDiv = $('<div>').addClass('latestpost');
                            const authordetails = $('<div>').addClass('authordetails');
                            const allbuttons = $('<div>').addClass('allbuttons');

                            // Extracting data from the blog article
                            const timestamp = fileData.find('.datepublished').text();
                            const authorprofile = fileData.find('.authorprofile').attr('src');
                            const authorname = fileData.find('.authorname').text();
                            const thumbnailURL = fileData.find('#thumbnailimage').attr('src');
                            const title = fileData.find('#titleofblog').text();
                            const mainBlogContent = fileData.find('#mainblogcontent').text();

                            // Function to fetch viewCount from Firebase based on title
                            fetchViewCount(title, function(viewCount) {
                                // Creating HTML elements
                                const timestampdisplay = $('<p>').addClass('timestampdisplay').html("• " + timestamp);
                                const authorProfileImg = $('<img>').addClass('authorprofile').attr('src', authorprofile).attr('alt', 'author profile');
                                const authorName = $('<p>').addClass('authorname').html(authorname);
                                const bannerImage = $('<img>').addClass('banner').attr('src', thumbnailURL).attr('alt', 'banner image');
                                const postHeading = $('<h3>').addClass('postheading').text(title);
                                const sometextOfPost = $('<p>').addClass('sometextofpost').text(getFirst40Words(mainBlogContent));
                                const viewers = $('<button>').addClass('viewers');

                                // Format view count
                                if (viewCount >= 1000000000) {
                                    viewers.html('<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (viewCount / 1000000000).toFixed(1) + 'B');
                                } else if (viewCount >= 1000000) {
                                    viewers.html('<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (viewCount / 1000000).toFixed(1) + 'M');
                                } else if (viewCount >= 1000) {
                                    viewers.html('<i class="fas fa-eye"></i>&nbsp;&nbsp;' + (viewCount / 1000).toFixed(1) + 'K');
                                } else {
                                    viewers.html('<i class="fas fa-eye"></i>&nbsp;&nbsp;' + viewCount);
                                }

                                const linkofblog = $('<a>').addClass('linkofblog').attr('href', articleUrl).attr('target', '_blank');
                                const gotoblogbutton = $('<button>').addClass('gotoblogbutton').html('Read now &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>');

                                // Appending elements to postDiv
                                authordetails.append(authorProfileImg, authorName, timestampdisplay);
                                postDiv.append(bannerImage, authordetails, postHeading, sometextOfPost, allbuttons);
                                allbuttons.append(viewers, linkofblog.append(gotoblogbutton));

                                // Append the postDiv to the latestPostContainer
                                latestpostsection.append(postDiv);
                            });
                        }
                    });
                }
            });
        },
        error: function(error) {
            console.error('Error fetching recent files:', error);
        }
    });
}

// Function to fetch viewCount from Firebase based on title
function fetchViewCount(title, callback) {
    const dbRef = firebase.database().ref();
    dbRef.orderByChild("title").equalTo(title).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const viewCount = childSnapshot.val().viewCount;
            callback(viewCount);
        });
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

$(document).ready(function() {
    fetchAndDisplayRecentFiles();
});
