var ulElement = document.querySelector('ul');
console.log(ulElement);

// ngăn chặn hành động khi click con chuột xuống
ulElement.onmousedown = function(e) {
    e.preventDefault();
}

ulElement.onclick = 
function(e) {
    console.log(e.target)
}

document.querySelector('ul').onclick =
function(e) {
    console.log(e.target);
}

document.querySelector('div').onclick = 
function() {
    console.log('DIV');
}
document.querySelector('button').onclick = 
function(e) {
    e.stopPropagation();
    console.log('Click me!');
}


var promise = new Promise (
    function(resolve,reject){
        resolve();
    }
)

promise
    .then(function(){
        return new Promise(function(resolve){
            setTimeout(resolve([1,2,3]),3000)
        });
    })
    .then(function(data){
        console.log(data)
    })
    // nếu như không bắt lỗi thì sẽ hiển thị Uncaught (in promise ) Co loi
    .catch(function(error){
        console.log(error);    
    })
    .finally(function(){
        console.log('Done!');
    })


    var users = [
        {
            id:1,
            name:'Kien Dam'
        },
        {
            id:2,
            name:'Son Dang'
        },
        {
            id:3,
            name:'Hung Dam'
        },
    ]

    var comments = [
        {
            id: 1,
            user_id: 1,
            content: 'Anh Son ra video chua anh oi'
        },
        {
            id:2,
            user_id:2,
            content: 'Vừa ra xong em ơi!'
        },
        {
            id:3,
            user_id:1,
            content: 'cam on anh!'
        },
    ]

// 1. Lấy comments
// 2. Từ comments lấy ra user_id(danh sách)
// 3. Từ user_id lấy ra user tương ứng

// Fake API

function getcomment(){
    return new Promise(function(resolve){
       
            resolve(comments)
        
    })
}

function getuserbyids(userids){
    return new Promise(function(resolve){
        var listuserids = users.filter(function(user){
            return userids.includes(user.id)
        })
        
            resolve(listuserids)
       
    })
}

getcomment()
    .then(function(comments){
        var userids = comments.map(function(comment){
            return comment.user_id
        })
        return getuserbyids(userids)
        .then(function(users){
            return {
                users: users,
                comments: comments
            }
        })
    })

    

    .then(function(data){
        var commentBlock = document.getElementById('comment-block');
        html =''
        console.log(data.comments)
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.user_id
            })
            
            html += `<li>${user.name}:${comment.content}</li>`
            console.log(html)
        })
        
        commentBlock.innerHTML = html;
    })


    
    var PostApi = 
    'https://jsonplaceholder.typicode.com/posts'

// fetch cũng chính là promise
// fetch trả lại 1 cái stream, luồng dữ liệu được trả về
fetch(PostApi)
    .then(function(response){
        //response chính là đối tượng, và có phương thức là json
        //return trả lại 1 promise
        return response.json()
        //json.parse: JSon -> Javascript types
    })
    .then(function(posts){
        // console.log(posts);
        var html = posts.map(function(post){
            return `<li>
            <h2>${post.title}</h2>
            <h2>${post.body}</h2>
            </li>`
        })
    })
    .catch(function(err){
        console.log('nooooo');
    })