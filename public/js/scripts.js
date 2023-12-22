
async function createPost(e) {
    e.preventDefault();
    const link=document.getElementById("post-link");
    const desc=document.getElementById("post-desc");
    const data={link:link.value,description:desc.value};
    await axios.post("http://localhost:3000/add-post",data).then(res=>{
        addPost([res.data]);
    });
    link.value="";
    desc.value="";
}

async function gatAllPost(){
    await axios.get("http://localhost:3000/get-post").then(res=>{
        addPost(res.data);
    })
}
async function addPost(data){
    const postContainer=document.getElementById("postContainer");
    for (const post of data) {
        const postCard=document.createElement("div");
        postCard.innerHTML=
            `<div class="user-profile">
    <img src=${post.link} alt="User Image" class="user-image">
    
    <h3 id=${post.id}>${post.description}</h3>
    <button class="btn btn-link" onclick="getComment(${post.id})">Add a Comment
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
</svg>
    </button>
    <div id="input-container${post.id}" class="mt-3 mb-2">        
        
    </div>        
</div>`
        postContainer.appendChild(postCard);
    }
}
async function getComment(id){
    const ids=id;
    await axios.get(`http://localhost:3000/get-comment/${id}`).then(res=>{
        const inputContainer=document.getElementById("input-container"+id);
        inputContainer.innerHTML=`        
        <div class="input-group-append">
        <input type="text" id="input-comment${id}" class="form-control comment-input" placeholder="Write a comment...">
            <button class="btn btn-primary" onclick=createComments(${ids}) type="button">Post</button>
        </div>
        <ul class="list-group" id="comment${id}">
        
        </ul>
    `
        const comment=document.getElementById("comment"+id);
        for (const comm of res.data) {
            const li=document.createElement("li");
            li.innerText="Anonymous: "+comm.comment;
            li.className="list-group-item"
            comment.appendChild(li);
        }
    })
}

async function createComments(id){
    const comment=document.getElementById("comment"+id);
    const input=document.getElementById("input-comment"+id)
    const data={postId:id,comment:input.value}
    await axios.post("http://localhost:3000/add-comment",data).then(res=>{
        const li=document.createElement("li");
        li.innerText="Anonymous: "+res.data.comment;
        li.className="list-group-item"
        comment.appendChild(li);
    })
    input.value="";
}