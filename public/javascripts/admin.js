


// Display All users records_____________________________________________________________________________
$(document).ready(function(){
  var user_id = $('#admin_id').val()
  console.log(user_id);
  show(user_id);
});

function show(user_id){
  var u_id = user_id;
  $.ajax({
   url: 'http://localhost:3000',
   method: 'post',
   data: {showData:1},
   success: function(responseData){
     $html = '';
     $html +='<table class="table table-bordered">';
     $html +='<thead>';
     $html +='<th>SL</th>';
     $html +='<th>Name</th>';
     $html +='<th>Email</th>';
     $html +='<th></th>';
     $html +='</thead> ';
     var count = 1;   
     $.each(responseData, function(key, value){

      if(u_id!=value.user_id){
      $html +='<tr>';
      $html +='<td>'+ count++ +'</td>';
      $html +='<td><a href="" id="edit_user" user-id="'+u_id+'" btn-type="mutual_friend" data-id="'+value.user_id+'" class="text-success user_action">'+value.name+'</a></td>';
      $html +='<td>'+value.email+'</td>';
      $html +='<td style="text-align:right; width:120px;"><a href=""  user-id="'+u_id+'" btn-type="add_friend" data-id="'+value.user_id+'" class="btn btn-success btn-sm user_action">Add Freind</a></td>';
      $html +='</tr>';
      }
    });

     $html +='</table>'; 

     $('#dataTable').html($html);    
   }
 });
}



// User Action Add Friends/Mutual Friends Record____________________________________________________________________
$(document).ready(function(){
 $(document).on('click', '.user_action', function(e){
  event.preventDefault();
  $anchor = $(event.target);
  var id = $anchor.attr('data-id');
  var user_id = $anchor.attr('user-id');
  var btn_type = $anchor.attr('btn-type');
  
  $.ajax({
    url: 'http://localhost:3000/user_action',
    method: 'post',
    dataType: 'json',
    data:{user_id:user_id, friend_id:id, btn_type:btn_type},
    success:function(response){

                 console.log(response);
                 if(response=='success'){
                      $('#mutualFriend').html('<span class="text-success">Friend added successfuly<span>');
                 }
                 else{
                 $html = '';
                  $html +='<ul>';
                  $html +='<h4>Mutual Friends</h4>';
                  if(response.length>0){
                      $.each(response, function(key, value){
                  $html +='<li class="ml-5"><a href="" class="text-success">'+value.name+'</a></li>';
                          console.log(value.name);
                 });
                  $html +='</ul>';
                  $('#mutualFriend').html($html)
                }
                else{
                  $('#mutualFriend').html("No Mutual friends");
                }
               
                   }
                 }
                 });
})
});



