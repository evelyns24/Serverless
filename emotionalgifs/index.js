const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) 
{
    context.log('JavaScript HTTP trigger function processed a request.');

    
    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);
    
    // TODO: assign the body variable the correct value
    const body = req.body;

    // parse the body
    const parts = multipart.Parse(body, boundary);

    //module.exports function
    //analyze the image
    const result = await analyzeImage(parts[0].data);
    let emotions = result[0].faceAttributes.emotion; 
    let objects = Object.values(emotions);
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    const API_KEY=process.env.GIFKEY;
    const resp=await fetch("https://api.giphy.com/v1/gifs/translate?api_key=" + API_KEY + "&limit=1&s=" + main_emotion);
    const d=await resp.json();
    context.log(d);

    context.res = { 
        body: d.data.url
    };
    console.log(result)
    context.done(); 
}

async function analyzeImage(img)
{
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'post',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        
        //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    })
    let data=await resp.json();
    
    return data;
}