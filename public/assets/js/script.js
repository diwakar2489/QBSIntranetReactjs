$(document).ready(function() {
  $('.upload_btn').on('click', function() {
    $('.file').trigger('click');
  });

  $('.file').on('change', function() {
    var fileName = $(this)[0].files[0].name;    
    $('#file-name').val(fileName);
  });
   $(".activecheck").click(function(){
    $(".inactivecheck").removeClass("active");
    $(".activecheck").addClass("active");
  });
  $(".inactivecheck").click(function(){
    $(".activecheck").removeClass("active");
    $(".inactivecheck").addClass("active");
  });
  
  $(".toggle_button").on("click", function() {
    $("#sidebar").toggleClass("showsidebar", 500);
    $("#content_area").toggleClass("contentarea", 500);
  });
  $( "#tabs" ).tabs({                
	active: false
  });
  $( "#proficiencytab" ).tabs({                
	active: false
  });
  $( "#officialtab" ).tabs({                
	active: false
  });
  $('.date_picker').datepicker({
	todayBtn: "linked",
	keyboardNavigation: true,
	forceParse: false,
	calendarWeeks: true,
	autoclose: true,
	format  : 'yyyy-mm-dd'
});


function openviewphoto(){ 
		$('#viewphoto').modal('show');
		$(".dropdownlisting_wrp").hide();
		$(".normal_overlay").removeClass("showoverlay");
	}
	$(".filebutton_wrp").click(function(){
		$(".dropdownlisting_wrp").hide();
		$(".normal_overlay").removeClass("showoverlay");
	});
	$(".overflow_img").click(function(){
		$(".dropdownlisting_wrp").toggle();
		$(".normal_overlay").addClass("showoverlay");
		$(".photo_blk").css("z-index","1000");
	}); 
	 $(".normal_overlay").click(function(){
		$(".dropdownlisting_wrp").hide();
		$(".normal_overlay").removeClass("showoverlay");
		$(".photo_blk").css("z-index","1");
	}); 
  
});
Scrollbar.initAll(); 

