$(document).ready(function () {

    $("#btn_google").click(function () {

        console.log("Im here")
        var Mytext = $("#searchInput").val();

        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        axios({
            method: 'POST',
            url: baseUrl + '/mymedia/google_search',
            data: {
                Mytext: Mytext
            }
        }).then(res => {
            var imageUrls = res.data;
            var imagerDiv = $('#imager');
            imagerDiv.empty();
            for (let i = 0; i < imageUrls.length; i++) {

                const collapseElement = `
                <div class="p-1">
                <label class="radio_label">
                <input type="radio" name="google_images" value="google_img_${i}">
                <img src="${imageUrls[i]}" class="display_img">
                </label>
                </div>
                `;
                $("#imager").append(collapseElement);
            }




        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });

    });


    $("#btn_unsplash").click(function () {
        var Mytext = $("#searchInput").val();
        console.log(Mytext)
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        axios({
            method: 'POST',
            url: baseUrl + '/mymedia/unsplash_search',
            data: {
                Mytext: Mytext
            }
        }).then(res => {
            var imageUrls = res.data;
            var imagerDiv = $('#img_unsplash');
            imagerDiv.empty();
            for (let i = 0; i < imageUrls.length; i++) {

                const collapseElement = `
                <div class="p-1">
                <label class="radio_label">
                <input type="radio" name="google_images" value="unsplash_img_${i}">
                <img src="${imageUrls[i]}" class="display_img">
                </label>
                </div>
                `;
                $("#img_unsplash").append(collapseElement);
            }

            console.log("Done")

        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    });

    $("#btn_pixels").click(function () {

        var Mytext = $("#p_searchInput").val();
        console.log(Mytext)
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        axios({
            method: 'POST',
            url: baseUrl + '/mymedia/pixels_search',
            data: {
                Mytext: Mytext
            }
        }).then(res => {
            var imageUrls = res.data;
            var imagerDiv = $('#img_pixels');
            imagerDiv.empty();
            for (let i = 0; i < imageUrls.length; i++) {

                const collapseElement = `
                <div class="p-1">
                <label class="radio_label">
                <input type="radio" name="google_images" value="pixels_img_${i}">
                <img src="${imageUrls[i]}" class="display_img">
                </label>
                </div>
                `;
                $("#img_pixels").append(collapseElement);
            }

            console.log("Done")

        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    });

    $("#btn_pixebay").click(function () {
        // Code to run when Button 3 is clicked
        var Mytext = $("#pixebay_searchInput").val();
        console.log(Mytext)
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        axios({
            method: 'POST',
            url: baseUrl + '/mymedia/pixebay_search',
            data: {
                Mytext: Mytext
            }
        }).then(res => {
            var imageUrls = res.data;
            var imagerDiv = $('#img_pixebay');
            imagerDiv.empty();
            for (let i = 0; i < imageUrls.length; i++) {
                const collapseElement = `
                <div class="p-1">
                <label class="radio_label">
                <input type="radio" name="google_images" value="pixebay_img_${i}">
                <img src="${imageUrls[i]}" class="display_img">
                </label>
                </div>
                `;
                $("#img_pixebay").append(collapseElement);
            }

            console.log("Done")

        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    });
   
    $("#btn_image_search").click(function () {
    
        var Mytext = $("#searchInput").val();
        console.log(Mytext)
        var platfrom = $("input[name='platfrom']:checked").val();
        
        console.log(platfrom);

        AishowLoader();
        let baseUrl = new URL(window.location.href);
        baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
        Secoundary_url=`/mymedia/${platfrom}_search`
        axios({
            method: 'POST',
            url: baseUrl + Secoundary_url,
            data: {
                Mytext: Mytext
            }
        }).then(res => {
            var imageUrls = res.data;
            AihideLoader();
            var imagerDiv = $('#imager');
            imagerDiv.empty();
            for (let i = 0; i < imageUrls.length; i++) {
                const collapseElement = `
                <div class="p-1">
                <label class="radio_label">
                <input type="radio" name="google_images" value="pixebay_img_${i}">
                <img src="${imageUrls[i]}" class="display_image">
                </label>
                </div>
                `;
                $("#imager").append(collapseElement);
            }
            const mybutton =`<button class="btn btn-dark my-1 px-4 w-100" type="submit" onclick="insertImage()" id="btn_add_image">Add image</button>`
            $("#imager").append(mybutton);
            console.log("Done")
        }).catch(err => {
            alert("ERROR");
            console.log(err);
        });
    });

    $("#upload_ig").click(function() {
        
          let img_src = $("input[name='google_images']:checked").next().attr('src');
          $('#img_url').val(img_src)
          const imageTag = document.getElementById('imageTag');
          imageTag.src = img_src;   
        if (img_url) {
            document.getElementById('imageContainer').style.display = 'block';
        } else {
            document.getElementById('imageContainer').style.display = 'none';
        }
          console.log("img_src=",img_src);
          $('#exampleModal').modal('hide');
    });
      
    
    

    



});

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}




function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});
// $(document).ready(function () {
//     let divempty = $(".url_preview");
//     let urlPreviewDiv = $(".image_preview");
//     prep_modal(divempty, urlPreviewDiv);
// });



async function createImage(img_src, frame_src){
    const collapseElement = `
        <img src="${img_src}" crossorigin="no-cors" id="myimage">
        <img src="${frame_src}" crossorigin="no-cors" id="frame">
        `;
        $("#previewimg").html(collapseElement);
        let frameImage = document.getElementById("frame");
        let pictureImage = document.getElementById("myimage");
        return Promise.all([
            new Promise(resolve=> pictureImage.onload = function(){
                return resolve(pictureImage);
            }),
            new Promise( resolve => frameImage.onload = function(){
                return resolve(frameImage);
            }),
        ]); 
    
}



async function newcreateImage(img_src){
    const collapseElement = `
        <img src="${img_src}" crossorigin="no-cors" id="myimage">
        `;
        $("#previewimg").html(collapseElement);
        let pictureImage = document.getElementById("myimage");
        return Promise.all([
            new Promise(resolve=> pictureImage.onload = function(){
                return resolve(pictureImage);
            }),
        ]);    
}

async function prep_modal(divempty, urlPreviewDiv) {
    
    $(".modal").each(function () {
        var element = this;
        var canvas_flag="false";
        var pages = $(this).find('.modal-split');
        let canvas = "";
        if (pages.length != 0) {
            pages.hide();
            pages.eq(0).show();
            var b_button = document.createElement("button");
            b_button.setAttribute("type", "button");
            b_button.setAttribute("class", "btn btn-primary");
            b_button.setAttribute("style", "display: none;");
            b_button.innerHTML = "Back";
            var n_button = document.createElement("button");
            n_button.setAttribute("type", "button");
            n_button.setAttribute("class", "btn btn-primary");
            n_button.innerHTML = "Next";

            $(this).find('.modal-footer').append(b_button).append(n_button);

            var page_track = 0;

            $(n_button).click(function () {
                this.blur();
                if (page_track == 0) {
                    $(b_button).show();
                }

                if (page_track == pages.length - 2) {
                    console.log(page_track)
                    let noframe = $("input[name='myframe']:checked").val();
                    const img_src = $("input[name='google_images']:checked").next().attr('src');


                    if(noframe=="frame_0"){
                        newcreateImage(img_src).then(function(imgArr){

                            console.log(imgArr[0])
                            const mergedResult = document.getElementById("img-canvas");
                            canvas = document.createElement("canvas");
                            var ctx = canvas.getContext('2d');
                            canvas.width = imgArr[0].width;
                            canvas.height = imgArr[0].height;
                            ctx.drawImage(imgArr[0], 0, 0, canvas.width, canvas.height);

                            mergedResult.innerHTML = "";
                            $("#previewimg").css("display", "none");
                           
                        }     
                     )
                        
                    }
                    else{
                        const frame_src = $("input[name='myframe']:checked").next().attr('src');
                        
                        createImage(img_src, frame_src).then(function(imgArr){

                            console.log(imgArr)
                            //let frameImage = createImage(frame_src);
                            //let pictureImage = createImage(img_src);
                            // console.log(pictureImage,frameImage );
                            const mergedResult = document.getElementById("img-canvas");
                            canvas = document.createElement("canvas");
                            let context = canvas.getContext("2d");
                            addcanvas();    

                            function addcanvas()
                            { 
                                canvas.width = imgArr[1].width;
                                canvas.height = imgArr[1].height;
                                context.drawImage(imgArr[1], 0, 0);
                            
                                const pictureWidth = imgArr[1].width / 1.4; // Adjust as needed
                                const pictureHeight = (pictureWidth * imgArr[0].height) / imgArr[0].width;
                            
                                context.drawImage(imgArr[0], (imgArr[1].width - pictureWidth) / 2, (imgArr[1].height - pictureHeight) / 2, pictureWidth, pictureHeight);
                                mergedResult.innerHTML = "";
                                $("#previewimg").css("display", "none");
                                // var myurl = canvas.toDataURL('image/png');
                                mergedResult.appendChild(canvas);
                                $("canvas").attr("class", "mycanvas");
                            }

                            let isEditing = false;
                            let editingText = "";
                            let textX = 0;
                            let textY = 0;
                            const drawnText = []; // Store drawn text objects

                            const textColorInput = document.getElementById("textColor");
                            const textSizeInput = document.getElementById("textSize");

                            canvas.addEventListener("click", (event) => {
                                if (!isEditing) {
                                    const x = event.clientX - canvas.getBoundingClientRect().left;
                                    const y = event.clientY - canvas.getBoundingClientRect().top;
                                    isEditing = true;
                                    console.log(x,y);
                                    textX = x/1.4;
                                    textY = y/1.4;
                                    showTextInput(x, y);
                                }
                            });

                            function showTextInput(x, y) {
                                const textInput = document.getElementById("textInput");
                                textInput.style.display = "block";
                                textInput.value = "";
                                textInput.style.left = x + "px";
                                textInput.style.top = y + "px";
                                textInput.focus();

                                textInput.addEventListener("blur", () => {
                                    hideTextInput();
                                });

                                textInput.addEventListener("keyup", (event) => {
                                    if (event.key === "Enter") {
                                        editingText = textInput.value;
                                        hideTextInput();
                                        drawText();
                                    }
                                });
                            }

                            function hideTextInput() {
                                const textInput = document.getElementById("textInput");
                                textInput.style.display = "none";
                                isEditing = false;
                            }

                            function drawText() {
                                const selectedColor = textColorInput.value;
                                const selectedSize = parseInt(textSizeInput.value);

                                context.font = `${selectedSize}px Arial`;
                                context.fillStyle = selectedColor;
                                context.fillText(editingText, textX, textY);

                                // Store the drawn text
                                drawnText.push({ text: editingText, x: textX, y: textY, size: selectedSize, color: selectedColor });
                            }

                            const removeTextButton = document.getElementById("removeTextButton");

                            removeTextButton.addEventListener("click", () => {
                                addcanvas();  
                            });

                            function removeLastText() {
                                if (drawnText.length > 0) {
                                    const lastText = drawnText.pop();
                                    context.clearRect(lastText.x, lastText.y - lastText.size, context.measureText(lastText.text).width, lastText.size + 5);
                                }
                            }

                        
                        })
                    }
                     
                     
                    $(n_button).text("Submit");
                    $(n_button).attr("id","savemedia");
                   
                }

                if (page_track == pages.length - 1) {
                    
                    $(n_button).attr("data-dismiss","modal");
                    divempty.empty();
                    console.log("canvas post preview", canvas);

                    var myurl = canvas.toDataURL('image/png');
                    console.log(myurl);
                    let formData = new FormData();
                    formData.append("canvas_data",myurl);
                    let baseUrl = new URL(window.location.href);
                    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
                    axios({
                        method: 'POST',
                        url: baseUrl + '/upload',
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
              

                       
                    }).catch(err =>{
                       
                        console.log(err);
                    })


                    
                        
                    console.log("At Submit button",page_track)
                   
                }
                if (page_track < pages.length - 1) {
                    console.log("error2",page_track)
                    page_track++;
                    pages.hide();
                    pages.eq(page_track).show();
                }
            });

            $(b_button).click(function () {
                if (page_track == 1) {
                    console.log(page_track)
                    $(b_button).hide();
                }
                if (page_track == pages.length - 1) {
                    console.log("error3",page_track)
                    $(n_button).removeAttr("data-dismiss");
                    $(n_button).text("Next");
                    $(n_button).removeAttr("id");
                }
                if (page_track > 0) {
                    console.log("error4",page_track)
                    page_track--;``
                    pages.hide();
                    pages.eq(page_track).show();
                }
            });

        }

    });
}


