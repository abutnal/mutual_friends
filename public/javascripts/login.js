

// User Create/Update_____________________________________________________________________________
$(document).ready(function(){
  $(document).on('submit', '#loginForm', function(e){
   e.preventDefault();
   $form = $(this)
   var postData = $form.serialize();
   $.ajax({
    url: $form.attr('action'),
    method: 'POST',
    data: postData,
    type: 'JSON',
            // contentType: false,
            // processData: false,
            // cache: false,
            success:function(response){

              console.log(response);

              if(response=='7k88dfldnfdnfsnf83497'){
              window.location.href = "http://localhost:3000/admin";
              location.reload();
               }
               else if(response=='failed'){

                $('#status_msg').html('Wrong username or password <br><br>');

               }
            else{
                // console.log('Validation Failed');
                $.each(response.errors, function(key, field){

                 if(field.msg=='Required'){
                  var  fieldName = field.param.charAt(0).toUpperCase() + field.param.slice(1)
                  $('#label-'+field.param).html(fieldName +' is required');
                  $('#label-'+field.param).removeClass('remove_err_class');
                  $('#label-'+field.param).addClass('add_err_class');
                }

              });
              }


            }


          });
 })
});



//Remove validation css class_____________________________________________________________________________
$(document).on('keydown', 'input', function(){
  $form = $(this);
  var x = $form.serializeArray();
  $.each(x, function(i, field){
    var  fieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1)
    $('#label-'+field.name).html(fieldName);
    $('#label-'+field.name).removeClass('add_err_class');
    $('#label-'+field.name).addClass('remove_err_class');
  });
});








