console.log ("js file loaded");

let names = [
    "Sleepy",
    "Sneezy",
    "Happy",
    "Grumpy",
    "Doc",
    "Bashful",
    "Dopey"
]
//get a reference to the button
let pickButton = document.getElementById("r_button")
console.log(pickButton)
pickButton.addEventListener('click', ()=>{
    console.log("button is clicked")
    
    //get access to the names array
    const noNames = names.length;
    console.log(noNames)

    //use Math to get a random name
    let randomIndex = Math.floor(Math.random() * noNames);
    console.log(randomIndex);

    //show random name on the html
    let pickedNameElement = document.getElementById("pickedName");
    pickedNameElement.innerHTML = names[randomIndex]
})


