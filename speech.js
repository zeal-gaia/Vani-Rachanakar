async function callTTS(text, voice = "shubh", pace = 1.0)
{
    const response = await fetch('tts.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text,
            voice,
            pace
        })
    });

    const data = await response.json();

    const audioUrl =
        `data:audio/mp3;base64,${data.audios[0]}`;

    return audioUrl;
}

function play(audioUrl)
{
    const audio = new Audio(audioUrl);
    audio.play();
}

async function create()
{ let data=[]; let text, voice, pace, audioUrl;
  let voices = [];
  document.getElementById("create").disabled=true;
  for(let i=0; i<blockCounter; i++)
  { text = document.getElementById(`text${i}`).value;
    voice = document.getElementById(`voices${i}`).value;
    pace = parseFloat(document.getElementById(`pace${i}`).value);
    audioUrl = await callTTS(text, voice, pace);
    const item = {
    text: text,
    audioUrl: audioUrl,
    voice: voice
    };
    data.push(item);
    voices.push(voice);
  }
  voices = [...new Set(voices)];
  const form = new FormData();
  form.append("text", JSON.stringify(data));
  form.append("voices", JSON.stringify(voices));
  const filename1 = document.getElementById("filename").value;
  const filename = "users/"+ filename1;
  form.append("filename", filename);  
  var response = await fetch("savefiles.php", {
    method: "POST",
    body: form
  });  
  let wrapper = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview Application</title>
    <style>
        body { margin: 0; padding: 0; font-family: sans-serif; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .download-bar { background: #2c3e50; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 100; }
        .btn-download { background: #27ae60; color: white; text-decoration: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px; transition: background 0.2s; }
        .btn-download:hover { background: #219653; }
        object { flex-grow: 1; width: 100%; border: none; }
    </style>
</head>
<body>

    <!-- A clean download bar at the top of their preview screen -->
    <div class="download-bar">
        <span>Vani Rachanakar Live Preview</span>
        <!-- This forces the browser to download the complete data file, saving it as a clean HTML file locally -->
        <a href="${filename1}.dat" download="${filename1}.html" class="btn-download">Save Application to Computer</a>
    </div>

    <!-- The interactive preview container -->
    <object data="${filename1}.dat" type="text/html"></object>

</body>
</html>
`;
  const form1 = new FormData();
  form1.append("text",wrapper);
  form1.append("filename", filename);  
  var response = await fetch("savewrapper.php", {
    method: "POST",
    body: form1
  }); 
  document.getElementById("create").disabled=false;
  document.getElementById('next').innerHTML+=
    `<a href="${filename}.html" target="_blank">Open the created web page</a><p>`;

}

// Keep track of the current index for the IDs
let blockCounter = 0;


function addNewTTSBlock()
{
    // Save this block's number.
    // This value will not change when blockCounter is incremented.
    const blockNumber = blockCounter;

    // Create wrapper div for this conversation line
    const containerDiv = document.createElement("div");

    containerDiv.className = "tts-block";
    containerDiv.id = `block-${blockNumber}`;


    // Generate the controls for this block
    containerDiv.innerHTML = `

        <p>Line #${blockNumber + 1}: &nbsp; &nbsp;

        <textarea
            cols="50"
            rows="2"
            id="text${blockNumber}"
        >Paste your text here</textarea>&nbsp;&nbsp;

        <label for="voices${blockNumber}">
            Choose a voice
        </label>

        <select id="voices${blockNumber}" name="voices">

       <option value="aayan">Aayan</option>
       <option value="aditya">Aditya</option>
       <option value="advait">Advait</option>
       <option value="amit">Amit</option>
       <option value="anand">Anand</option>
       <option value="ashutosh">Ashutosh</option>
       <option value="dev">Dev</option>
       <option value="gokul">Gokul</option>
       <option value="ishita">Ishita</option>
       <option value="kabir">Kabir</option>
       <option value="kavitha">Kavitha</option>
       <option value="kavya">Kavya</option>
       <option value="manan">Manan</option>
       <option value="mani">Mani</option>
       <option value="mohit">Mohit</option>
       <option value="neha">Neha</option>
       <option value="pooja">Pooja</option>
       <option value="priya">Priya</option>
       <option value="rahul">Rahul</option>
       <option value="ratan">Ratan</option>
       <option value="rehan">Rehan</option>
       <option value="ritu">Ritu</option>
       <option value="rohan">Rohan</option>
       <option value="roopa">Roopa</option>
       <option value="rupali">Rupali</option>
       <option value="shubh">Shubh</option>
       <option value="shreya">Shreya</option>
       <option value="shruti">Shruti</option>
       <option value="simran">Simran</option>
       <option value="soham">Soham</option>
       <option value="suhani">Suhani</option>
       <option value="sumit">Sumit</option>
       <option value="sunny">Sunny</option>
       <option value="tanya">Tanya</option>
       <option value="tarun">Tarun</option>
       <option value="varun">Varun</option>
       <option value="vijay">Vijay</option>

        </select> &nbsp; &nbsp;

        <label for="pace${blockNumber}">
            Choose pace (0.5 to 2.0):
        </label>

        <input
            type="range"
            id="pace${blockNumber}"
            name="pace"
            min="0.5"
            max="2.0"
            step="0.1"
            value="1.0"
        >

        <output
            id="paceOutput${blockNumber}"
            for="pace${blockNumber}"
        >1.0</output>

        <button class="go-button">Test</button>

        <hr>
    `;


    // Add the block to the page
    document
        .getElementById("main")
        .appendChild(containerDiv);


    // Get the controls belonging specifically to this block
    const textBox =
        document.getElementById(`text${blockNumber}`);

    const voiceSelect =
        document.getElementById(`voices${blockNumber}`);

    const paceSlider =
        document.getElementById(`pace${blockNumber}`);

    const paceOutput =
        document.getElementById(`paceOutput${blockNumber}`);

    const goButton =
        containerDiv.querySelector(".go-button");


    // Display pace as slider is moved
    paceSlider.addEventListener("input", () => {
        paceOutput.value = paceSlider.value;
    });


    // Handle Go button
    goButton.addEventListener("click", async () => {

        const text = textBox.value;
        const voice = voiceSelect.value;
        const pace = parseFloat(paceSlider.value);

        const audioUrl =
            await callTTS(text, voice, pace);

        play(audioUrl);
    });


    // Ready for next block
    blockCounter++;
}


