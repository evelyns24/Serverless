const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    if (username=="")
    {
        alert("")
    }
    const output = document.getElementById("output")
    output.textContent = "Thanks!"
});