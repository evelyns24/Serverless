const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const eng=req.query.plaintext;
    var code="";

    if (typeof eng === 'undefined' || eng === "") 
    {
        code = "Please enter some text to  convert!";
    }
    else 
    {
        code=morse.textToMorse(eng);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code 
    };
}