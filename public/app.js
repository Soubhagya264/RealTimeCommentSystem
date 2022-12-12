let username
let socket = io();
do {
    username = prompt('Enter Your name')
} while (!username)

const textarea = document.querySelector('#textarea');
const submitBtn = document.querySelector(".submitButton");
const commentbox = document.querySelector(".comment_box");

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let comment = textarea.value
    if (!comment) {
        return
    }
    postComment(comment)
})

function postComment(comment) {
    // Append the comment to dom
    let data = {
        username: username,
        comment: comment
    }
    appendToDom(data)
    textarea.value = '';
    // broadcast the comment
    broadcast(data)
}
function appendToDom(data) {
    let markup = `
            <li class="comment">
                          <div class="card border-light mb-3">
                            <div class="card-body">
                                <h5>${data.username}</h5>
                                <p>${data.comment}</p>
                                <div>
                                    <img src="clock.png" alt="">
                                    <small>${moment(data.time).format('LT')}</small>
                                </div>
                  </div>
                </div>
            </li>
    `
    let liTag = document.createElement("li");
    liTag.classList.add("comment", "mb-3");
    liTag.innerHTML = markup
    commentbox.prepend(liTag);
}
function broadcast(data) {
    socket.emit("comment", data);

}
socket.on('comment', (data) => {
    appendToDom(data);
})

let typingDiv=document.querySelector(".typing");
socket.on('typing', (data) => {
    typingDiv.innerText=`${data.username} is typing....`
    typingDiv.innerText='';
})

// Event Listeners on Text animationIterationCount: 
textarea.addEventListener('keyup',(e)=>{
    socket.emit(`typing`,{username});
})

