var keywords = document.getElementById('keywordsinput');
var description = document.getElementById('descriptioninput');
var inputText = document.getElementById('textInput');
var selectElement = document.getElementById('blogtopicdirectorylocation');
var authorprofile = document.querySelector('.authorprofile');
var thumbnailInput = document.getElementById('Thumbnailimage');
var authorNameInput = document.getElementById('authorname');
var publishingDateInput = document.getElementById('publishingdate');
var mainBlogContentTextarea = document.getElementById('mainblogcontentortext');
var blogtextconclusion = document.getElementById('blogtextconclusion');

var selectedOptionText = '# ' + '';
var base64Url = '';

function convertToBase64() {
    const file = thumbnailInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Url = e.target.result;
            console.log('Base64 URL:', base64Url);
            updateIframeContent(base64Url);
        };

        reader.readAsDataURL(file);
    } else {
        console.error('No file selected.');
    }
}


function updateIframeContent() {
    selectedOptionText = selectElement.options[selectElement.selectedIndex].text;

    if (authorNameInput.value === 'Nitya Diwedi') {
        authorprofile = '<center><img src="https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/authors/nityadiwedi.webp" class="authorprofile"></center>';
    }

    else if (authorNameInput.value === 'Akshat Diwedi') {
        authorprofile = '<center><img src="https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/authors/akshat.jpg" class="authorprofile"></center>';
    }


    var htmlContent = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="type" content="article">
    <link rel="icon" type="image/x-icon" href="https://cdn.jsdelivr.net/gh/Akshat-Diwedi/Narrative_Nook_Assets_Storage@main/logo/NN2.ico">
    <meta name="keywords" content="${keywords.value} , narrative nook">
    <meta name="description" content="${description.value}">
    <meta name="robots" content="INDEX, FOLLOW">
    <meta name="author" content="${authorNameInput.value}">

    <meta property="og:image" content="https://cdn.jsdelivr.net/gh/Akshat-Diwedi/Narrative_Nook_Assets_Storage@main/logo/comp-logo.png">
    <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/Akshat-Diwedi/Narrative_Nook_Assets_Storage@main/logo/comp-logo.png" type="image/x-icon">

    <!-- Google Tag Manager -->
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MSCR6F3C');
    </script>
    <!-- End Google Tag Manager -->

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7173793275169905" crossorigin="anonymous"></script>
    <meta name="google-site-verification" content="OCV8EpD187GIS1Omnljjkf3_sNlSv2tx-IoASFeQUFs" />

    <script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-database.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link id="csstylesheetplace" rel="stylesheet" href="">
    <title>${inputText.value}</title>
    </head>
    
    <body>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MSCR6F3C" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    
            <div class="topbar">
                <h2 class="logoname">Narrative &nbsp;&nbsp; Nook</h2>
                <div class="searchbox">
                    <input type="text" class="postsearch" placeholder="Search Post Here !" oninput="enableSearchButton()">
                    <button class="searchpostbtn" onclick="searchpost()" id="searchButton" disabled><i class="fas fa-search"></i></button>
                </div>
            </div>
    
    
        <center>
            <div class="searchresults">
                <center>
                    <h4 class="searchinstruction">On average, it only takes about 4 seconds to find an article. If you don't
                        see any results, it means there's nothing matching your search in our database.</h4>
                </center>
            </div>
        </center>
    
        <br><br><br><br><br><br>
    
        <div class="blogbox">
    
            <div class="authordetails">
    
                ${authorprofile}
    
                <div class="nameanddate">
    
                    <div class="nameofauthordiv">
                        <h2 class="authorname">${authorNameInput.value}</h2><br>
                    </div>
    
                    <div class="datewhenpostispublisheddiv">
                        <h3 class="datepublished">${publishingDateInput.value}</h3>
                    </div>
    
    
                </div>
    
            </div>
    
            <center>
                <div class="sharebuttonsbox">
                    <div class="sharebuttonboxinnerdiv">
                        <button class="sharebuttons" onclick="shareOnFacebook()"><i class="fab fa-facebook"></i></button>
                        <button class="sharebuttons" onclick="shareOnTwitter()"><i class="fab fa-twitter"></i></button>
                        <button class="sharebuttons" onclick="shareOnLinkedIn()"><i class="fab fa-linkedin"></i></button>
                        <button class="sharebuttons" onclick="shareOnWhatsApp()"><i class="fab fa-whatsapp"></i></button>
                        <button class="sharebuttons" onclick="shareOnTelegram()"><i class="fab fa-telegram"></i></button>
                        <button class="sharebuttons" onclick="copyToClipboard()"><i class="fa fa-copy"></i></button>
                    </div>
                </div>
            </center>
    
            <br><br>
    
            <center><img id="thumbnailimage" src="${base64Url}"></center>
    
            <center>
                <h1 id="titleofblog">${inputText.value}</h1><br>
            </center>
    
            <center>
                <div id="mainblogcontent">${mainBlogContentTextarea.value}</div>
            </center>
    
            <div class="hrline"></div>
    
            <h2 class="conclusionh2tag">Conclusion :</h2>
            <p class="conclusionofblog">${blogtextconclusion.value}</p>
    
            <div class="hrline"></div>
            <center>
                <h2 class="summarisedbyaih2tag">Summarised By Ai : &nbsp;<button class="betabtn"
                        onclick="alert('Currently in beta phrase it means maybe we can remove it in future ! , Further testing of this feature is continually conducted to make response even better !')">Beta</button>
                </h2>
            </center>
            <a name="navigatetoaisummarise">
                <center>
                    <p class="aisummarisedcontent"></p>
                </center>
            </a>
            <a href="#navigatetoaisummarise">
                <button onclick="summarisetheblog()" class="aisummarisingbutton"></button>
            </a>
    
    
            <div class="hrline"></div><br><br>
            <h3 class="tagstextalignment">Tags :</h3>
            <div class="tagsanddirectorydiv">
                <button class="tagbutton">${selectedOptionText}</button>
            </div>
    
    
        </div>
    
        <script src="https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/javascript/blogarticlescriptv2.js"></script>
        <script>
        function checkWidthAndStyle() {
            var link = document.getElementById("csstylesheetplace");
            if (document.body.offsetWidth > 500) {
                link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/css/blogv3.css');
            } else if (document.body.offsetWidth <= 500) {
                link.setAttribute('href', 'https://cdn.jsdelivr.net/gh/Nuclear-Games/Narrative_Nook_Assets_Storage@main/css/mobileblogfile.css');
            } else {
                console.log("Something went wrong!");
            }
        }

        checkWidthAndStyle();
        window.addEventListener('resize', function () {
            checkWidthAndStyle();
        });
        </script>
    </body>
    
    </html>`;

    var outputIframe = document.getElementById('outputIframe');
    var iframeDocument = outputIframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(htmlContent);
    iframeDocument.close();
}

inputText.addEventListener('input', updateIframeContent);
keywords.addEventListener('input', updateIframeContent);
selectElement.addEventListener('change', updateIframeContent);
thumbnailInput.addEventListener('change', convertToBase64, updateIframeContent);
authorNameInput.addEventListener('input', updateIframeContent);
publishingDateInput.addEventListener('input', updateIframeContent);
mainBlogContentTextarea.addEventListener('input', updateIframeContent);
blogtextconclusion.addEventListener('input', updateIframeContent);

updateIframeContent(); // Initial update when the page loads

// Function to download generated HTML
function downloadHtml() {
    var inputTextValue = inputText.value;
    var outputIframe = document.getElementById('outputIframe');
    var htmlContent = outputIframe.contentDocument.documentElement.outerHTML;
    var blob = new Blob([htmlContent], { type: 'text/html' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = inputTextValue + '.html';
    link.click();
}
