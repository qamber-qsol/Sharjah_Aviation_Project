function showUPLoader() {
  document.querySelector('.loader-small').style.display = 'block';
}
  
function hideUPLoader() {
  document.querySelector('.loader-small').style.display = 'none';
}

let urlcheck=true;
const app = {
  $delimiters: ['${', '}'],
  text: "",
  updateText(event) {
    this.text = event.target.value;
    const newText = this.text;
    
    // if (newText.includes(' ')) {
    var checkvalue=event.target.value;
    isValidURL(checkvalue);
          
    // if(urlcheck==true)
    // {
    
    //     if (isValidURL(checkvalue)==null) {
    //     console.log("IS NOT URL");
    //         } 
    //     else {
    //   var myurl=isValidURL(checkvalue);
    //   var url=myurl[0];
    //   updatePreview(url)
    //   console.log("IS  URL");
    //   urlcheck=false;
      
    //       }
    // }
    // else{
    //   console.log("All Good");
    // }
    
  },
};
const vm = PetiteVue.createApp(app).mount();

function isValidURL(url) {
  let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  return url.match(urlRegex)
}

function updatePreview(myurl) {
  // Clear previous data
  $(".url_preview").css("display", "block");
  $(".title").text("");
  $(".description").text("");
  $(".icon").attr("src", "").hide();

  
  $.ajax({
    url: `/get_url_preview?url=${encodeURIComponent(myurl)}`,
    method: 'GET',
    dataType: 'json',
    success: function(response) {
        console.log('URL Preview:', response);
        $(".title").text(response.title);
        mytext=response.description;
        const maxLength = 80;
        var limitedString = limitString(mytext, maxLength);
        $(".description").text(limitedString);
        
        if (response.image_url) {
          $(".icon").attr("src", response.image_url).show();
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $(".title").text("No Preview available");
        console.error('Error fetching URL preview:', textStatus, errorThrown);
    }
  });

}

function limitString(str, maxLength) {
  if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
  }
  return str;
}

$('#chooseFile').bind('change', function () {
  const filename = $("#chooseFile").val();

  if (/^\s*$/.test(filename)) {
      $(".file-upload").removeClass('active');
      $("#noFile").text("No file chosen...");
  } else {
      console.log("The file name", filename);

      const formData = new FormData();
      formData.append('file_doc', $('#chooseFile')[0].files[0]);

      let baseUrl = new URL(window.location.href);
      baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
      showUPLoader();
      axios({
          method: 'POST',
          url: baseUrl + '/uploadFile',
          data: formData
      }).then(res => {
          console.log(res.data);
          const responseData = res.data;
          const uploadFilename = responseData.filename;
          console.log(uploadFilename);

          $(".file-upload").addClass('active');
          $("#noFile").text(uploadFilename);

          // Create a new img tag
          const imgTag = $('<img>');

          // Set the src attribute with a data URL
          imgTag.addClass("mycanvas")
          imgTag.attr('src',responseData.file_base64);

          // Append the img tag to the div with class "image_preview"
          $('.image_preview').html(imgTag);
          hideUPLoader();

      }).catch(err => {
          console.error("Upload failed:", err);
          alert("Upload failed!");
          $(".file-upload").removeClass('active');
          $("#noFile").text("No file chosen...");
          hideUPLoader();
      });
  }
});

$(document).ready(function() {
  // Add an event listener to the input field
  $('#web_url').on('input', function() {
     
      
      let inputurl=$(this).val();
      isValidURL(inputurl)
      if (isValidURL(inputurl)==null) 
      {
        console.log("IS NOT URL");
            
      } 
      else {
      var myurl=isValidURL(inputurl);
      var url=myurl[0];
      updatePreview(url)
      console.log("IS  URL");
      }
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const closeButton = document.querySelector('.myclose');
  const previewDiv = document.querySelector('.url_preview');

  closeButton.addEventListener('click', function() {
    // Set the display property to "block" instead of removing the element
    previewDiv.style.display = 'block';
  });
});

