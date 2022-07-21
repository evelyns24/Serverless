const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', async function (event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    if (username=="")
    {
        alert("No name error.")
        return;
    }
    
    let fileInput =document.getElementaryById("image");
    const file=fileInput.files[0];
    var payload=new FormData(bunnForm);
    payload.append("file",file)
    console.log(payload);
    endpoint="https://bitproject.azurewebsites.net/api/bunnimage-upload?code=89gBB4P0rtslUAZ8OrSptfkHoUX9RNDuQwUL32oa8uioAzFuZgparw=="
    options={
        "method": "POST",
        "body": payload,
        headers: {
            "codename": username,
            "Content-Type": "multipart/form-data"
        }
    }
    const resp=await fetch(endpoint,options);
    const data=await resp.text();
    output.textContent="Your image has been stored successfully!"
});

const downloadButton=document.getElementaryById("button1");
downloadButton.addEventListener("click", async function (event) {
    var username = document.getElementaryById("downloadUsername"),value;
    console.log("Attempting to get your image ...");

    const url="https://bitproject.azurewebsites.net/api/bunnimage-download?code=GT_or_ZThxWfuRwoiZ6CtCgmzt-4zfs1jqopbCyeC2KhAzFuiJRiAg=="

    const resp =await fetch(url, {
        method: "GET",
        headers: {
            username: username,
        },
    });

    const data = await resp.json();
    console.log("Image has been received");
    console.log(data);

    window.open(data.downloadUri, "_self");
});