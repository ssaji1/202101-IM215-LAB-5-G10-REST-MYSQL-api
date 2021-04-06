

function createUser(event) {
    event.preventDefault();
    const user = {
        first_name: $('#firstName').val(),
        last_name: $('#lastName').val(),
        age: $('#age').val(),
    }
    fetch('http://localhost:3333/user', {
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        method: 'POST',
        body: JSON.stringify(user)
    }).then(response => response.json())
      .then((json) => {console.log(json)})
      .catch(error => console.error(error))  
}


function requestUsers(){
    $.ajax({
        url: 'http://localhost:3333/user',
        type: 'GET',
        dataType: 'json',
        success: function(user) {
            var row=''
            for (var i=0; i<user.length; i++) {
                row = row + '<tr><td>' + user[i].first_name+ 
                '</td><td>' + user[i].last_name + 
                '</td><td>' + user[i].age + 
                '</td></tr>';
            }
            $('tbody').html(row);
        }
    });
    
}
function retrieveUser(event){
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3333/user/'+$('#userId').val(),
        method: 'GET',
        dataType: 'json',
        success: function(user) {
            $('#firstName2').val(user.first_name)
            $('#lastName2').val(user.last_name)            
        }
    });
}

function deleteUser(event){
    event.preventDefault();
   $.ajax({
       url: 'http://localhost:3333/user/'+$('#duserId').val(),
       method: 'DELETE',
       success: function(user) {
        alert('Delete user with id:'+$('#duserId').val())
       }       
   });
   
}