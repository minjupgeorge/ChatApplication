const displayChannels=document.getElementById("channels");
const displayMembers=document.getElementById("members");
const chatdata = document.getElementById("chat")

async function getChannels() {
   
    const response = await fetch(`http://localhost:1337/api/channels`);
    const result = await response.json();
    const channels = result.data;
    console.log("channels",channels);
    let liTag = "";
    channels.forEach((obj) => {
      liTag =
        `<li onclick="openChat(event)">${obj.attributes.Name}</li>` +
        liTag;
    });
    
     displayChannels.innerHTML = liTag;

    }
  getChannels();

  function openChat(event) {
      const chatName = event.target.innerText;
      //console.log("chatinside",chatName);
      getMessages(chatName);
}

async function getMessages(chatName){
    const response = await fetch(
      `http://localhost:1337/api/messages?populate=channel,Sender&filters[channel][Name][$eq]=${chatName}`
    );
    const result = await response.json();
    const data = result.data;
    console.log(data)
  let divTag = ""
  if(data.length===0) return
  data.forEach((obj )=> {
       
        divTag = divTag +`<div>
  <h3>${obj.attributes.Sender.data.attributes.Name}</h3>
  <h4>${obj.attributes.Text}</h2>
</div>`;
    })
    
    chatdata.innerHTML = divTag
}
  getMessages();

  async function getUsers() {
   
    const response = await fetch(`http://localhost:1337/api/chatusers`);
    const result = await response.json();
    const users = result.data;
    console.log("users",users);
    let liTag = "";
    users.forEach((obj) => {
        
      //const url = obj.attributes.Mediadata.data.attributes.formats.thumbnail.url;
      //console.log(url);
      liTag =
        `<li> ${obj.attributes.Name}</li>` +
        liTag;
    });
    
     displayMembers.innerHTML = liTag;
  }
  getUsers();