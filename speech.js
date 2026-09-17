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
  const filename = document.getElementById("filename").value;
  form.append("filename", filename);  
  var response = await fetch("savefiles.php", {
    method: "POST",
    body: form
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

            <option value="shubh">Shubh</option>
            <option value="aditya">Aditya</option>
            <option value="ritu">Ritu</option>
            <option value="priya">Priya</option>
            <option value="neha">Neha</option>
            <option value="rahul">Rahul</option>
            <option value="pooja">Pooja</option>
            <option value="rohan">Rohan</option>
            <option value="simran">Simran</option>
            <option value="kavya">Kavya</option>
            <option value="amit">Amit</option>
            <option value="dev">Dev</option>
            <option value="ishita">Ishita</option>
            <option value="shreya">Shreya</option>
            <option value="ratan">Ratan</option>
            <option value="varun">Varun</option>
            <option value="manan">Manan</option>
            <option value="sumit">Sumit</option>
            <option value="roopa">Roopa</option>
            <option value="kabir">Kabir</option>
            <option value="aayan">Aayan</option>
            <option value="ashutosh">Ashutosh</option>
            <option value="advait">Advait</option>
            <option value="anand">Anand</option>
            <option value="tanya">Tanya</option>
            <option value="tarun">Tarun</option>
            <option value="sunny">Sunny</option>
            <option value="mani">Mani</option>
            <option value="gokul">Gokul</option>
            <option value="vijay">Vijay</option>
            <option value="shruti">Shruti</option>
            <option value="suhani">Suhani</option>
            <option value="mohit">Mohit</option>
            <option value="kavitha">Kavitha</option>
            <option value="rehan">Rehan</option>
            <option value="soham">Soham</option>
            <option value="rupali">Rupali</option>

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


