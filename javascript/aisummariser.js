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