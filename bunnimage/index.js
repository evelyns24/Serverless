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