$(document).ready(function() {
  $('.upload_btn').on('click', function() {
    $('.file').trigger('click');
  });
  $(".activecheck").click(function(){
    $(".inactivecheck").removeClass("active");
    $(".activecheck").addClass("active");
  });
  $(".inactivecheck").click(function(){
    $(".activecheck").removeClass("active");
    $(".inactivecheck").addClass("active");
  });
  $('.file').on('change', function() {
    var fileName = $(this)[0].files[0].name;    
    $('#file-name').val(fileName);
  });
   
})