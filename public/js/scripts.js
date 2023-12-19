
async function createPost(e) {
    e.preventDefault();
    const link=document.getElementById("postlink");
    const desc=document.getElementById("postdesc");
    const data={link:link.value,description:desc.value};
    console.log(data)
    await axios.post("http://localhost:3000/add-post",data).then(res=>{
        console.log(res.data);
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
        const post1=document.createElement("div");
        post1.innerHTML=
            `<div class="user-profile">
    <img src=${post.link} alt="User Image" class="user-image">
    
    <h3 id=${post.id}>${post.description}</h3>
    <a onclick="getComment(${post.id})">Add a Comment</a>
    <div id="inputcontainer${post.id}" class="mt-3 mb-2">        
        
    </div>        
</div>`
        postContainer.appendChild(post1);
    }
}
async function getComment(id){
    const desc=document.getElementById(id).innerText;
    const ids=id;
    await axios.post("http://localhost:3000/get-comment",{description: desc}).then(res=>{
        const inputContainer=document.getElementById("inputcontainer"+id);
        inputContainer.innerHTML=`
        <input type="text" id="input-comment${id}" class="form-control input-group comment-input" placeholder="Write a comment...">
        <div class="input-group-append">
            <button class="btn btn-primary" onclick=createComments(${ids}) type="button">Post</button>
        </div>
        <ul id="comment${id}">
        
        </ul>
    `
        const comment=document.getElementById("comment"+id);
        for (const comm of res.data) {
            const li=document.createElement("li");
            li.innerText="Anonymous: "+comm.comment;
            comment.appendChild(li);
        }
    })
}

async function createComments(id){
    const desc=document.getElementById(id).innerText;
    console.log(desc)
    const comment=document.getElementById("comment");
    const input=document.getElementById("input-comment"+id)
    const data={description:desc,comment:input.value}
    await axios.post("http://localhost:3000/add-comment",data).then(res=>{
        const li=document.createElement("li");
        li.innerText=res.data.comment;
        comment.appendChild(li);
    })
    input.value="";
}