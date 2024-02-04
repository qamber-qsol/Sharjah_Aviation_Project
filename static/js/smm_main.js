let baseUrl = new URL(window.location.href);
baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
accountData=[];


for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

       
$('#clients_selector').on('change', function () {
    const selectedValue = $(this).val();
    console.log(selectedValue);
   
    axios({
        method: 'POST',
        url: baseUrl + '/social_group/socialPost',
        data: {
            client_id:selectedValue
        }  
    }).then(res => {
        const myoptions = res.data;
        console.log(myoptions);
        $('#new_accounts').empty();
        for (let i = 0; i < myoptions.length; i++) {
            console.log( myoptions[i][1] );
            const accounts=`
            <div class="select">
            <input type="checkbox" id="${myoptions[i][0]}" name="${myoptions[i][2]}">
            <label class="btn border-secondary button_select" for="${myoptions[i][0]}"><i class="fa m-0 mx-1 p-1 fa-${myoptions[i][2]}"></i>${ myoptions[i][1]}</label>
            </div>
            `
            $('#new_accounts').append(accounts);

        }


    }).catch(err => {
        console.error(err);
    });
});
$('#clients_selector_campaign').on('change', function () {
    const selectedValue = $(this).val();
    console.log(selectedValue);
   
    axios({
        method: 'POST',
        url: baseUrl + '/social_group/socialPost',
        data: {
            client_id:selectedValue
        }  
    }).then(res => {
        const myoptions = res.data;
        console.log(myoptions);
        $('#new_accounts_campaign').empty();
        for (let i = 0; i < myoptions.length; i++) {
            console.log( myoptions[i][1] );
            const accounts=`
            <div class="select">
            <input type="checkbox" id="${myoptions[i][0]}" name="${myoptions[i][2]}">
            <label class="btn border-secondary button_select" for="${myoptions[i][0]}"><i class="fa m-0 mx-1 p-1 fa-${myoptions[i][2]}"></i>${ myoptions[i][1]}</label>
            </div>
            `
            $('#new_accounts_campaign').append(accounts);

        }


    }).catch(err => {
        console.error(err);
    });
});


$('#Createcampaign').on('change', function () {
    const CampaignID = $(this).val();
    console.log(CampaignID);
    axios({
        method: 'DELETE',
        url: baseUrl + '/social_group/Createcampaign',
        data: {
            Campaignids:CampaignID
        }  
    }).then(res => {
        accountData = res.data;
        console.log(accountData);

    }).catch(err => {
        console.error(err);
    });

});


function generateCampaignID() {
    let CAMGNID= "CAMGN"+Math.floor(Math.random() * 1000000);
    return CAMGNID
}
function getCurrentFormattedDate() {
    // Get the current date and time
    var currentDate = new Date();

    // Format the date and time as a string in the desired format
    var currentDateString =
    currentDate.getFullYear() + '-' +
    ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + currentDate.getDate()).slice(-2) + ' ' +
    ('0' + currentDate.getHours()).slice(-2) + ':' +
    ('0' + currentDate.getMinutes()).slice(-2) + ':' +
    ('0' + currentDate.getSeconds()).slice(-2);
    // Return the formatted date string
    return currentDateString;
  }

  function getDatesBetween(startDateTime, endDateTime, days, repeation) {
    var startDate = new Date(startDateTime);
    var endDate = endDateTime ? new Date(endDateTime) : null;

    // If no end date is provided, generate dates for at least 3 months
    if (!endDateTime) {
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 3);
    }

    var result = [];

    while (startDate <= endDate) {
        var currentDay = startDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        var dayName = getDayName(currentDay);

        if (days.includes(dayName)) {
            var formattedDateTime = formatDate(startDate);
            result.push(formattedDateTime);
            
            if (!repeation) {
                // If repeation is false, break after the first occurrence of each day
                days = days.filter(day => day !== dayName);
            }
        }

        startDate.setTime(startDate.getTime() + (24 * 60 * 60 * 1000)); // Move to the next day
    }

    return result;
}

function getDayName(day) {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[day];
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1);
    var day = padZero(date.getDate());
    var hours = padZero(date.getHours());
    var minutes = padZero(date.getMinutes());
    var seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}



    // $("#getSelectedValues").click(function () {
    //     var selectedValues = [];
    //     // Iterate over each checkbox
    //     $("input[type='checkbox']").each(function () {
    //         if ($(this).is(":checked")) {
    //             // If checkbox is checked, add its value (id) to the array
    //             selectedValues.push($(this).attr("id"));
    //         }
    //     });
    //     // Display the selected values in an alert or console
    //     console.log(selectedValues);
    //     alert(selectedValues)        // You can also do other operations with the selected values here.
    // });
    function showToastMessage(type, text) {
        switch (type) {
            case 'success':
                toastr.success(text);
                break;
            case 'info':
                toastr.info(text);
                break;
            case 'error':
                toastr.error(text);
                break;
            case 'warning':
                toastr.warning(text);
                break;
            default:
                console.error('Invalid toast type');
                break;
        }
    }

    function ProfileView(){
        Unselected_IDS=[];
        const baseURL =baseUrl
        $('#new_accounts input[type="checkbox"]:not(:checked)').each(function() {
            var unselectedId = $(this).attr('id');
            Unselected_IDS.push(unselectedId);
            
        });
        if ($('#new_accounts input[type="checkbox"]:checked').length === 0) {
            showToastMessage("error","Please Select Atleast One Profile!");
        }
        else {    
            myshowLoader();
            axios({
                method: 'POST',
                url: baseUrl + '/social_group/FinalizeProfile',
                data: {                                                 
                    socialIDs:Unselected_IDS,
                }
            }).then(res => {

                myhideLoader();
                var response = res.data;
                if(response.type != 'error'){
                    showToastMessage(response.type,response.message);
                    location.reload(true);
                }
                else{
                    showToastMessage(response.type,response.message);
                    
                }
                
                window.location.href = baseURL + "/view_token";

            }).catch(err =>{
                myhideLoader();
                showToastMessage("error",err);
                console.log(err);
            });
        }

    
    }
    
    async function makeRequest(url, payload) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            return response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    function All_Social_Post() {
        // Validate if at least one checkbox is selected
        
        if (
            $("input[name='linkedin']:checked").length > 0 ||
            $("input[name='twitter']:checked").length > 0 ||
            $("input[name='pinterest']:checked").length > 0 ||
            $("input[name='facebook']:checked").length > 0 ||
            $("input[name='instagram']:checked").length > 0
        ) {
            // At least one checkbox is checked, no problem
            console.log("At least one checkbox is selected!");
            var UrlData={};

            // Declare variables with appropriate scopes
            const baseUrl = new URL(window.location.href);
            baseUrl.protocol = baseUrl.protocol.replace(':', ''); // Remove colon from protocol
            const client_id = $("#clients_selector :selected").val();
            const page_content = $('#fb_post_form textarea').val();
            const Media_Url = $(".mycanvas").attr('src');
    
            var linkUrl = $('#web_url').val();
            if (linkUrl) {
                var imgUrl = $('.url_preview .img_section img').attr('src') || "https://admin.amslaw.ph/uploads/misc/noImagePreview.jpg";
                var titleText = $('#title').text().trim() || "No title";

                var UrlData = {
                "url": linkUrl,
                "imgUrl": imgUrl,
                "title": titleText
                };
            }
            else{
                UrlData=null;
            }
            console.log(JSON.stringify(UrlData));
        
            const social = {
                "facebook": { url: 'facebook/fb_post', id: [] },
                "twitter": { url: 'twitter/tw_post', id: [] },
                "instagram": { url: 'instagram/ig_post', id: [] },
                "linkedin": { url: 'linkedin/ld_post', id: [] },
                "pinterest": { url: 'pinterest/post', id: [] }

            };

            $('input[type="checkbox"]:checked').each(function () {
                const inputValue = $(this).attr('id');
                const social_type = $(this).attr('name');
                
                if (social_type === 'facebook') {
                    social["facebook"].id.push(inputValue);
                } else if (social_type === 'twitter') {
                    social["twitter"].id.push(inputValue);
                } else if (social_type === 'instagram') {
                    social["instagram"].id.push(inputValue);
                } else if (social_type === 'linkedin') {
                    social["linkedin"].id.push(inputValue);
                } else if (social_type === 'pinterest') {
                    social["pinterest"].id.push(inputValue);
                }
                });

            
            var postData = {
                firstcomment:"Welcome!",
                Media_URL:Media_Url,
                UrlData:UrlData,
                myurl: $('#web_url').val(),
                page_content: $('#fb_post_form textarea').val(),
                client_id: client_id,
                currentUserDate:getCurrentFormattedDate(),
                userTimezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
                fb_id: social["facebook"]["id"],
                ig_id: social["instagram"]["id"],
                lkd_id: social["linkedin"]["id"],
                tw_id: social["twitter"]["id"],
                pt_id: social["pinterest"]["id"],      
            
            };
            // Additional validations
            if (!client_id) {
                alert("Select Account Group!");
            } else if (!page_content.trim()) {
                alert('Add Post Content!');
            } else {
                // Perform AJAX requests
                const urlPrefix = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
                var requests = [];
                let reloadFlag=0;
                myshowLoader(); // Assuming this function is defined
                for (var key in social) {
                    if (social[key].id.length > 0) {
                        requests.push(makeRequest(`${urlPrefix}/${social[key].url}`, postData));
                    }
                }
    
                // Handle responses
                Promise.all(requests)
                .then((responses) => {
                    myhideLoader();
                    console.log(responses);  
            
                    responses.forEach((responseArray) => {
                        responseArray.forEach((response) => {
                            showToastMessage(response.type, response.message);
                            if(response.type=='error'){
                                reloadFlag=1;
                            }                            
                        });
                    });
                    if(reloadFlag==0)
                    {
                        location.reload(true);
                    }
  
                })
                .catch((error) => {
                    myhideLoader();
                    console.error(error);
                    showToastMessage('error', 'Something Went Wrong');
                });
            
            }
        } else {
            alert("Please select at least one Account!");
            return; // Stop execution if no checkbox is selected
        }
    }
    
    
function All_Social_schedule() {
    var UrlData={};
    if (
        $("input[name='linkedin']:checked").length > 0 ||
        $("input[name='twitter']:checked").length > 0 ||
        $("input[name='pinterest']:checked").length > 0 ||
        $("input[name='facebook']:checked").length > 0 ||
        $("input[name='instagram']:checked").length > 0
    ) {
    const baseUrl = new URL(window.location.href);
    baseUrl.protocol = baseUrl.protocol.replace(':', ''); // Remove colon from protocol
    const client_id = $("#clients_selector :selected").val();
    page_content= $('#fb_post_form textarea').val()
    const Media_Url = $(".mycanvas").attr('src');
    
    eventtitle=$('#titleSchedule').val();
    const social = {
        "facebook": { url: 'facebook/fb_sch', id: [] },
        "twitter": { url: 'twitter/tw_sch', id: [] },
        "instagram": { url: 'instagram/ig_sch', id: [] },
        "linkedin": { url: 'linkedin/ld_sch', id: [] },
        "pinterest": { url: 'pinterest/schedule', id: [] }
    };

    $('input[type="checkbox"]:checked').each(function () {
        const inputValue = $(this).attr('id');
        const social_type = $(this).attr('name');
        
        if (social_type === 'facebook') {
            social["facebook"].id.push(inputValue);
        } else if (social_type === 'twitter') {
            social["twitter"].id.push(inputValue);
        } else if (social_type === 'instagram') {
            social["instagram"].id.push(inputValue);
        } else if (social_type === 'linkedin') {
            social["linkedin"].id.push(inputValue);
        } else if (social_type === 'pinterest') {
            social["pinterest"].id.push(inputValue);
        }
        });
        var linkUrl = $('#web_url').val();
            if (linkUrl) {
                var imgUrl = $('.url_preview .img_section img').attr('src') || "https://admin.amslaw.ph/uploads/misc/noImagePreview.jpg";
                var titleText = $('#title').text().trim() || "No title";

                var UrlData = {
                "Status":true,
                "url": linkUrl,
                "imgUrl": imgUrl,
                "title": titleText
                };
            }
            else{
                UrlData={"Status":false};
            }

    var postData = {
        eventtitle:eventtitle,
        UrlData:UrlData,
        colorClass:$('input[name="color"]:checked').attr('id'),
        mydate:$('#mydate').val(),
        currentUserDate:getCurrentFormattedDate(),
        userTimezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
        myurl: $('#web_url').val(),
        page_content: $('#fb_post_form textarea').val(),
        client_id: client_id,
        Media_URL:Media_Url,
        fb_id: social["facebook"]["id"],
        ig_id: social["instagram"]["id"],
        lkd_id: social["linkedin"]["id"],
        tw_id: social["twitter"]["id"],
        pt_id: social["pinterest"]["id"],        
    };

    if(!client_id)
    {
        showToastMessage('error',"Select Account Group!");
    }
    else if(!page_content.trim() || !eventtitle) 
    {   



        showToastMessage('error','Please fill all Required fields!');    
    }
    else if (!$('#mydate').val())
    {   
        showToastMessage('error','Please select a date and time');    
    } 
    else{
    const urlPrefix = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    var requests = [];
    myshowLoader();
    let reloadFlag=0;
    for (var key in social) {
        if (social[key].id.length > 0) {
            requests.push(makeRequest(`${urlPrefix}/${social[key].url}`,postData)); 
        }  
        }

    Promise.all(requests) 
        .then((responses) => {
            myhideLoader();
            console.log(responses);  
    
            responses.forEach((responseArray) => {
                responseArray.forEach((response) => {
                    showToastMessage(response.type, response.message);
                    if(response.type=='error'){
                        reloadFlag=1;
                    }                            
                });
            });
            if(reloadFlag==0)
            {
                 location.reload(true);
            }
  

        })
        .catch((error) => {
            myhideLoader();
            console.error(error);
            showToastMessage('error', 'Something Went Wrong');
        });
    }}
    else {

        showToastMessage('error','Please select at least one Account!');           
        return; 
    }
}



function Campaign_schedule() {

    let CampaignID=null;
    let startDate=null;
    let EndDate=null
    let CampaignName=null;
    let SchedulingDates=[];
    let SocialMediaIDs=[];
    let ETitle=$('#titleCampaign').val();
    if(!ETitle){showToastMessage('error','Please add Post title!');    }
    let EventTitle=null;
    
    const baseUrl = new URL(window.location.href);
    baseUrl.protocol = baseUrl.protocol.replace(':', ''); // Remove colon from protocol
    let SchedulingDays=null;
    console.log("Selected Days:",SchedulingDays)
    var ChampaignType = $("#customSwitch1:checked").length > 0;
    
    
    const client_id = $("#clients_selector :selected").val();
    page_content= $('#fb_post_form textarea').val()
    const Media_Url = $(".mycanvas").attr('src');

    const social = {
        "facebook": { url: 'facebook/fb_sch', id: [] },
        "twitter": { url: 'twitter/campaign', id: [] },
        "instagram": { url: 'instagram/campaign', id: [] },
        "linkedin": { url: 'linkedin/campaign', id: [] },
        "pinterest": { url: 'pinterest/campaign', id: [] }
    };
    if (ChampaignType) {

        console.log("New Campaign");
        CampaignID=generateCampaignID();
        CampaignName=$("#campaignName").val();
        social["campaign"] = { url: 'social_group/Createcampaign',id:[CampaignID]};
        startDate=$("#startdate").val();
        
        EndDate=$("#enddate").val();
        console.log("Start Date:",startDate,"\nEndDate: ",EndDate)
        SchedulingDays=$("#selectDays").val();
        
        if(!client_id || !CampaignName || !startDate || !EndDate || !SchedulingDays)
        {
            showToastMessage('error','Please! fill all required fields');
        }
        else{
            $('#new_accounts_campaign input[type="checkbox"]:checked').each(function () {
                const inputValue = $(this).attr('id');
                const social_type = $(this).attr('name');
            
                if (social_type === 'facebook') {
                    social["facebook"].id.push(inputValue);
                } else if (social_type === 'twitter') {
                    social["twitter"].id.push(inputValue);
                } else if (social_type === 'instagram') {
                    social["instagram"].id.push(inputValue);
                } else if (social_type === 'linkedin') {
                    social["linkedin"].id.push(inputValue);
                } else if (social_type === 'pinterest') {
                    social["pinterest"].id.push(inputValue);
                }
            
                SocialMediaIDs.push(inputValue);
                console.log(SocialMediaIDs);
            });
        }
        }
    else{

        console.log("Checkbox is Off");
        var selectedOption = $('#Createcampaign option:selected');
        let CamSelector = $('#Createcampaign :selected').val();
        console.log(CamSelector);
        if(CamSelector=='Select Campaign:'){showToastMessage('error','Please Select Campaign');}
        else{CampaignID = selectedOption.val();
            CampaignName= selectedOption.text();
            startDate = selectedOption.data('startdate');
            EndDate = selectedOption.data('enddate');
            var daysArray = selectedOption.data('days');
            SchedulingDays = daysArray.split(',');
        
      
        
        console.log("MyDAYS",SchedulingDays);        
            accountData.forEach(function(data) {
                var accountId = data[0];
                var socialType = data[1];
            
                if (socialType in social) {
                    social[socialType].id.push(accountId);
                }
            });}
          
        }

    
    console.log('recurringTask is now checked');
    SchedulingDates= getDatesBetween(startDate ,EndDate, SchedulingDays,true);
    console.log('SchedulingDates',SchedulingDates)
    var linkUrl = $('#web_url').val();
    if (linkUrl) {
        var imgUrl = $('.url_preview .img_section img').attr('src') || "https://admin.amslaw.ph/uploads/misc/noImagePreview.jpg";
        var titleText = $('#title').text().trim() || "No title";

        var UrlData = {
        "url": linkUrl,
        "imgUrl": imgUrl,
        "title": titleText
        };
        }
    else{
        UrlData=null;
        }
    console.log(JSON.stringify(UrlData));
    EventTitle=ETitle   
    var postData = {
        CampaignSchedule:true,
        eventtitle:EventTitle,
        UrlData:UrlData,
        Media_URL:Media_Url,
        colorClass:$('input[name="color"]:checked').attr('id'),
        mydate:$('#mydate').val(),
        currentUserDate:getCurrentFormattedDate(),
        userTimezone:Intl.DateTimeFormat().resolvedOptions().timeZone,
        myurl: $('#web_url').val(),
        page_content: $('#fb_post_form textarea').val(),
        client_id: client_id,
        file_doc: $("#noFile").text(),
        fb_id: social["facebook"]["id"],
        ig_id: social["instagram"]["id"],
        lkd_id: social["linkedin"]["id"],
        tw_id: social["twitter"]["id"],
        pt_id: social["pinterest"]["id"],
        CampaignID:CampaignID,
        NewCampaignName:CampaignName,
        allDate:SchedulingDates,
        CamStartDate: startDate,
        CamEndDate:EndDate,
        DayOfweek:SchedulingDays,
        SocialMediaIDs:SocialMediaIDs,       
    };
    console.log(postData)

   
if(!page_content.trim()) 
{ 
    showToastMessage('error','Content Missing!');    
}
else{

const urlPrefix = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
var requests = [];
myshowLoader();
let reloadFlag=0;
for (var key in social) {
    if (social[key].id.length > 0) {
        requests.push(makeRequest(`${urlPrefix}/${social[key].url}`,postData)); 
    }  
    }

Promise.all(requests) 
    .then((responses) => {
        myhideLoader();
        console.log(responses);     

        responses.forEach((responseArray) => {
            responseArray.forEach((response) => {
                showToastMessage(response.type, response.message);
                if(response.type=='error'){
                    reloadFlag=1;
                }                            
            });
        });
        if(reloadFlag==0)
        {
            location.reload(true);
        }


    })
    .catch((error) => {
        myhideLoader();
        console.error(error);
        showToastMessage('error', 'Something Went Wrong');
    });
} }
function DeleteEventButton(ScheduleID) {
       
    
}  
function DeleteAllContent() {
        
    var confirmed = confirm("Are you sure you want to delete all content?");
    
    if (confirmed) {
        $("#fb_data").val("");
        $("#fb_data").trigger("input");
    }
}   


$("#close_modal").click(function() {
    location.reload(true);
});

function myshowLoader() {
    document.querySelector('.loader-wrapper').style.display = 'flex';
}
    
function myhideLoader() {
    document.querySelector('.loader-wrapper').style.display = 'none';
}

function AishowLoader() { 
    $('.spinner-border').css('display', 'block');
}

function AihideLoader() {
    $('.spinner-border').css('display', 'none');
}

function showModalContent(button) {
    let rObj = $(button).closest("tr");
    let myid = rObj.find("td:nth-child(1)").text();

    console.log(myid);

    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/post_data',
        data: {
            myid: myid
        }
    }).then(res => {
        var data = res.data;
        var thisModel = $(button).data('target');
        var textarea = $(thisModel).find('#my-textarea');
        
        textarea.val(data);
        textarea.attr('sid', myid);
        $(thisModel).show();

        $(thisModel).find('[data-close="model"]').click(function () {
            $(thisModel).hide();
        });

        $(window).click(function (event) {
            if ('#' + event.target.id === thisModel) {
                $(thisModel).hide();
            }
        });

    }).catch(err => {
        alert("ERROR");
        console.log(err);
    });
}


$(document).ready(function() {
    let targetElm = null;
let tipDelay = 100; // 1000 = 1 sec

function _(elm) {
  return document.getElementById(elm);
}

function showTooltip(e) {
  e.stopPropagation();
  let tooltip = _("tooltip_container");
  tooltip.style.left =
    e.pageX + tooltip.clientWidth + 10 < document.body.clientWidth
      ? e.pageX + 10 + "px"
      : document.body.clientWidth + 5 - tooltip.clientWidth + "px";
  tooltip.style.top =
    e.pageY + tooltip.clientHeight + 10 < document.body.clientHeight
      ? e.pageY + 0 + "px"
      : document.body.clientHeight + 20 - tooltip.clientHeight + "px";

  if (showTooltips == false) {
    setTimeout(delayedShowTooltip, tipDelay);
  }

  try {
    if (e.target.getAttribute("tooltip").length <= 0) {
      tooltip.classList.remove("visible_t");
    }
  } catch (e) {
    //--
    return;
  }

  tooltip.innerText = e.target.getAttribute("tooltip");
  showTooltips = true;
}

let showTooltips = false;
function hideTooltip() {
  let tooltip = _("tooltip_container");
  tooltip.classList.remove("visible_t");
  showTooltips = false;
}

if (_("tooltip_container") == null) {
  let tpId = document.createElement("div");
  tpId.setAttribute("id", "tooltip_container");
  document.body.appendChild(tpId);
}

function delayedShowTooltip() {
  let tooltip = _("tooltip_container");
  if (showTooltips) {
    tooltip.classList.add("visible_t");
  }
}

function addToolTips() {
  let tooltips = document.querySelectorAll("[tooltip]");
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].addEventListener("mousemove", showTooltip);
  }
  for (var i = 0; i < tooltips.length; i++) {
    tooltips[i].addEventListener("mouseleave", hideTooltip);
    tooltips[i].addEventListener("click", hideTooltip);
  }
}

//Call this to add or update tooltip boundings
addToolTips();

    $('.nDatetime').each(function () {
       
        var dateString = $(this).text();     
        var date = new Date(dateString);     
        var timeDifference = Date.now() - date.getTime();       
        var hours = timeDifference / (1000 * 60 * 60);
 
        if (hours < 1) {
         
          $(this).closest('.sec').addClass('new');
        }
      });
    var count = $('.new').length;
    if (count > 0) {
        console.log('Number of elements with class "new":', count);
        $('.number').text(count)
    }
    
    $('#fileButton').click(function() {
        // Trigger click on the hidden file input
        $('#chooseFile').click();
      });

    $('.deleteConnect').on('click', function () {
        let socialAccountID = $(this).closest('.mainPanel').attr('name');
        console.log('Name attribute of closest mainPanel: ' + socialAccountID);
        var confirmation = window.confirm('Do you want to delete this item?');
        
        if (confirmation) {
            myshowLoader();
            axios({
                method: 'POST',
                url: baseUrl + '/view_token',
                data: {
                    socialAccountID:socialAccountID,
                }
            }).then(res => {

                myhideLoader();
                $(this).closest('.ConnectPanel').fadeOut();

            }).catch(err =>{
                myhideLoader();
                alert("Unable To Delete");
                console.log(err);
            });
        }

        else {
          alert('You clicked "No", and the item will not be deleted.');
        
        }
      
    });
      

    $("#facebookPostLink").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/facebook/fb_post";
            });

    $("#fb_connect").click(function() {
       var fb_url = $(this).attr("name");
       let client_id = $("#client_connect :selected").val();
       session_name="client_id"
       if (!client_id){
        alert("Please ! Select Client")
       }
       else{
       
       $.ajax({
        type: 'GET',
        url: `/store_in_session/${session_name}/${client_id}`,
        success: function(response) {
            console.log(response);
            window.location.href=fb_url;
        },
        error: function(error) {
            console.error('Failed to store data in session.');
        }
        });
       
       }});

       $("#ig_connect").click(function() {
        var fb_url = $(this).attr("name");
        let client_id = $("#client_connect :selected").val();
        session_name="client_id"
        if (!client_id){
         alert("Please ! Select Client")
        }
        else{
        
        $.ajax({
         type: 'GET',
         url: `/store_in_session/${session_name}/${client_id}`,
         success: function(response) {
             console.log(response);
             window.location.href=fb_url;
         },
         error: function(error) {
             console.error('Failed to store data in session.');
         }
         });
        
        }});

    $("#lkd_connect").click(function() {
        var fb_url = $(this).attr("name");
        let client_id = $("#client_connect :selected").val();
        session_name="client_id"
       if (!client_id){
        alert("Please ! Select Group")
       }
        else{
        $.ajax({
         type: 'GET',
         url: `/store_in_session/${session_name}/${client_id}`,
         success: function(response) {
             console.log(response);
             window.location.href=fb_url;
         },
         error: function(error) {
             console.error('Failed to store data in session.');
             // Handle the error here
         }
         });
        
        }
     });
     $("#lkd_page_connect").click(function() {
        var fb_url = $(this).attr("name");
        let client_id = $("#client_connect :selected").val();
       session_name="client_id"
       if (!client_id){
        alert("Please ! Select Group")
       }
        else{
        $.ajax({
         type: 'GET',
         url: `/store_in_session/${session_name}/${client_id}`,
         success: function(response) {
             console.log(response);
             window.location.href=fb_url;
         },
         error: function(error) {
             console.error('Failed to store data in session.');
             // Handle the error here
         }
         });
         
        }
     });
     $("#tw_connect").click(function() {
        var fb_url = $(this).attr("name");
        let client_id = $("#client_connect :selected").val();
       session_name="client_id"
       if (!client_id){
        alert("Please ! Select Group")
       }
        else{
        $.ajax({
         type: 'GET',
         url: `/store_in_session/${session_name}/${client_id}`,
         success: function(response) {
             console.log(response);
             // Handle the success response here
         },
         error: function(error) {
             console.error('Failed to store data in session.');
             // Handle the error here
         }
         });
         window.location.href=fb_url;
        }
     });

     $("#pinterest_connect").click(function() {
        var fb_url = $(this).attr("name");
        let client_id = $("#client_connect :selected").val();
       session_name="client_id"
       if (!client_id){
        alert("Please ! Select Group")
       }
        else{
        $.ajax({
         type: 'GET',
         url: `/store_in_session/${session_name}/${client_id}`,
         success: function(response) {
             console.log(response);
             // Handle the success response here
         },
         error: function(error) {
             console.error('Failed to store data in session.');
             // Handle the error here
         }
         });
         window.location.href=fb_url;
        }
     });

    
    function isValidEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

    // Keyup event on the email input
    $('#NewUserEmail').keyup(function () {
        // Get the entered email
        const email = $(this).val();

        // Check if the email is valid
        if (isValidEmail(email)) {
            // If valid, display success message
           console.log("Vaild")
        } else {
            // If not valid, display error message
            console.log("INVaild")
        }
    }); 




        
    });

$(document).ready(function() {
    $("#bkUpload").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/bulkuploads/bulkUp";
            });

    $("#socialPost").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/social_group/socialPost";
            });

    $("#socialSchedule").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/social_group/socialSchedule";
            });

    $("#campaignSchedule").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/social_group/campaignSchedule";
            });

    $("#role").on("change", function () {
        var selectedValue = $(this).val();
        if (selectedValue == "3") {
         
            $("#ManagerSelection").removeClass("d-none");
        } else {
          
            $("#ManagerSelection").addClass("d-none");
        }
   
    
    });


   
    // $('#client_type').on('change', function() {
    //     let $clientType = $('#client_type');
    //     let client_IDs = $clientType.val();
    
    //     console.log('Selected values:', client_IDs);
    //     setTimeout(function() {
    //         myshowLoader();
    
    //         axios({
    //             method: 'POST',
    //             url: baseUrl + '/view_token',
    //             data: {
    //                 client_IDs: client_IDs,
    //             }
        //     }).then(res => {
        //         var post_id = res.data;
        //         console.log(post_id)
        //         const tableHTML = `
        //         <table class="bg-light report_table table table-hover table-responsive-sm text-capitalize text-center">
        //             <thead>
        //                 <tr>
        //                 <th>ID</th>
        //                 <th>Social Type</th>
        //                 <th>Social Name</th>
        //                 <th>Expire After</th>
        //                 <th></th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 ${post_id.map(data => `
        //                     <tr>
        //                         <td>${data[0]}</td>
        //                         <td class="font-weight-bolder">${data[1]}</td>
        //                         <td><i class="fa fa-${data[2]}"></i></td>
        //                         <td class="text-danger">${data[3]} Days</td>
        //                         <td><button class="btn btn-danger w-100" onClick="DeleteConnect(this)">Delete</button></td>
        //                     </tr>
        //                 `).join('')}
        //             </tbody>
        //         </table>
        //     `;
        //     $('.report_section').html(tableHTML);
        // myhideLoader();
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //     }, 1500); // 1000 milliseconds = 1 second delay
    // });
      
    // $('#client_type').on('change', function() {
    //     console.log('Change event triggered');
    //     let clientIDs = $(this).val();
    //     console.log('Selected values:', clientIDs);
    
    //     if (clientIDs) {
    //         // If a value is selected, fetch and display the table
    //         fetchAndDisplayTable(clientIDs);
    //     } else {
    //         // Handle the case when no option is selected, e.g., clear the table
    //         $('.report_section').html('');
    //     }
    // });
    // function fetchAndDisplayTable(clientIDs) {
    //     console.log('Fetching table for:', clientIDs);
    //     myshowLoader();
    
    //     axios({
    //         method: 'POST',
    //         url: baseUrl + '/view_token',
    //         data: {
    //             client_IDs: clientIDs,
    //         }
    //     }).then(res => {
    //             var post_id = res.data;
    //             console.log(post_id)
    //             const tableHTML = `
    //             <table class="bg-light report_table table table-hover table-responsive-sm text-capitalize text-center">
    //                 <thead>
    //                     <tr>
    //                     <th>ID</th>
    //                     <th>Social Type</th>
    //                     <th>Social Name</th>
    //                     <th>Expire After</th>
    //                     <th></th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     ${post_id.map(data => `
    //                         <tr>
    //                             <td>${data[0]}</td>
    //                             <td class="font-weight-bolder">${data[1]}</td>
    //                             <td><i class="fa fa-${data[2]}"></i></td>
    //                             <td class="text-danger">${data[3]} Days</td>
    //                             <td><button class="btn btn-danger w-100" onClick="DeleteConnect(this)">Delete</button></td>
    //                         </tr>
    //                     `).join('')}
    //                 </tbody>
    //             </table>
    //         `;
    //         $('.report_section').html(tableHTML);
    //         myhideLoader();
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }



});






function DeleteConnect(obj) {
    let rObj = $(obj).closest("tr");
    let socialAccountID=rObj.find("td:nth-child(1)").text();
    console.log(socialAccountID);
    
    let confirmation = window.confirm('Do you want to delete this item?');
        
    if (confirmation) 
    {
        myshowLoader();
        axios({
            method: 'DELETE',
            url: baseUrl + '/view_token',
            data: {
                socialAccountID:socialAccountID,
                }
            
        }).then(res => {

            res = JSON.parse(JSON.stringify(res));
            // alert("Successfully Removed!");
            myhideLoader();
            $(obj).closest("tr").fadeOut();
            
        }).catch(err =>{
            alert("ERROR");
            console.log(err);
        })
    }
    else {
        alert('You clicked "No", and the Connect will not be deleted.');  
    
    }
    
}



$(document).ready(function () {
    $('#fb_data').on('input', function () {
        var text = $(this).val();
        var displaycount=2000-text.length;
        var $submitButton = $('.PostsubmitButton');

        // Update the character count display
        $('#charaterCount').text(displaycount);
        if (displaycount < 0) {
            $('#charaterCount').css('color', 'red');
            $submitButton.prop('disabled', true);
        } else {
            $('#charaterCount').css('color', '#13D1D8');
            $submitButton.prop('disabled', false);

        }
    });
   
});



$(document).ready(function() {
    $("#tw_sch").click(function(event) {
        event.preventDefault();
        var baseURL = window.location.origin;
        window.location.href = baseURL + "/twitter/tw_sch";
            });
});

function taskQueue(){
    let task_type=$('#task_type').val();
    console.log(task_type);
    myshowLoader();
    axios({
        method: 'POST',
        url: baseUrl + '/postQueue',
        data: {
            task_type:task_type
        }
    }).then(res => {
        myhideLoader();
        const myoptions = res.data;
        console.log(myoptions);
        $('#listArea').empty();
        for (let i = 0; i < myoptions.length; i++) {
            const listQueue=`
            <div class="row shadow my-2" id="${myoptions[i][3]}">
            <div class="col-2 p-3 text-center">
            <div class="bg-secondary logo m-0 p-0 py py-4 text-light"><i class="fa fa-4x fa-${myoptions[i][0]}"></i></div></div>
            <div class="col-10 p-2">
              <div class="p-2 row">
                <div class="col-md-6">${myoptions[i][1]}</div>
                <div class="col-md-6 px-3 text-md-right">${myoptions[i][4]}</div>
              </div>
              <div class="row">
                <div class="m-0 px-4">
                    ${myoptions[i][2]}
                </div>
              </div>
              <div class="row"> 
                <div class="col-md-6"></div>
                <div class="col-md-6 px-4 text-capitalize text-md-right">${myoptions[i][3]}</div>
              </div>
            </div>
          </div>
            
            `
            $('#listArea').append(listQueue);

        }

    }).catch((err) => { 
        alert("Unable to Change!");
    })

}
$('#table').on('click', '#approvedPost', function () {
    // Find the closest row and get the ID from the second column (index 1)
    var requestId = $(this).closest('tr').find('td:eq(1)').text();
    console.log('ID for approvedPost button: ' + requestId);

    myshowLoader();

    axios({
        method: 'POST',
        url: baseUrl + '/PostApprove/approveQueue',
        data: {
            requestId: requestId,
        }
    }).then(res => {
        myhideLoader();
        showToastMessage('success','Post : Approved!')
        console.log("Post Successfully!");

        // Apply fade-out effect and then remove the closest row after a successful response
        $(this).closest('tr').fadeOut(400, function () {
            $(this).remove();
        });
    }).catch(err => {
        myhideLoader();
        showToastMessage('error','Post :Unable to Approved!')
        console.log(err);
    });
});

$('#table').on('click', '#declinePost', function () {
    
    var requestId = $(this).closest('tr').find('td:eq(1)').text();
    console.log('ID for approvedPost button: ' + requestId);
    let confirmation = window.confirm('Do you want to declined this post?');
        
    if (confirmation) 
    {
    myshowLoader();

    axios({
        method: 'DELETE',
        url: baseUrl + '/PostApprove/approveQueue',
        data: {
            requestId: requestId,
        }
    }).then(res => {
        myhideLoader();
        showToastMessage('success','Post : Declined!')
        console.log("Post Successfully!");

        // Apply fade-out effect and then remove the closest row after a successful response
        $(this).closest('tr').fadeOut(400, function () {
            $(this).remove();
        });
    }).catch(err => {
        myhideLoader();
        showToastMessage('error','Post :Unable to Declined!')
        console.log(err);
    });
}
else {
    showToastMessage('success','The Post will not be declined.');  

}
});

$(document).ready(function() {
    
    // $("#approvedPost").click(function() {

    //     var id = $(this).closest('tr').find('td:eq(1)').text();
    //     console.log('ID for approvedPost button: ' + id);

    //     let requestId = $(this).closest(".row").find("#RequestID").attr("name");
    //     let SocialType=  $(this).closest(".row").find("#socialType").text();
    //     myshowLoader();
    //     axios({
    //         method: 'POST',
    //         url: baseUrl + '/approveQueue',
    //         data: {
    //             requestId:requestId,
    //         }
    //     }).then(res => {
    //         myhideLoader()
    //         $(this).closest("#queueTab").fadeOut(600, function() {
    //             $(this).remove();
    //         });
           
    //         console.log("Post Successfully!");

    //     }).catch(err =>{
    //         alert("ERROR");
    //         console.log(err);
    //     });
    // });

    // $("#declinePost").click(function() {

    //     console.log("AT DECLINE")
    //     let requestId = $(this).closest(".row").find("#RequestID").attr("name");
    //     myshowLoader();
    //     axios({
    //         method: 'DELETE',
    //         url: baseUrl + '/approveQueue',
    //         data: {
    //             requestId:requestId,
    //         }
    //     }).then(res => {
    //         myhideLoader()
    //         $(this).closest("#queueTab").fadeOut(600, function() {
    //             $(this).remove();
    //         });
    //         console.log("Post Successfully!");

    //     }).catch(err =>{
    //         alert("Unable");
    //         console.log(err);
    //     }); 
    // });
});



function ChangePassword() {
       
    
    var oldpass = $('#oldPassword').val();
    console.log(oldpass);
    var newPassword = $('#newpassword').val();
    var retypePassword = $('#renewpassword').val();

    // Check if the passwo  rds match
    if (newPassword === retypePassword) {
        // Passwords match - you can proceed with form submission or other actions here
        console.log('Passwords match!');
        myshowLoader();
        
        axios({
            method: 'POST',
            url: baseUrl + '/settings',
            data: {
                oldpass:oldpass,
                newPassword:newPassword,  
            }
        }).then(res => {
            myhideLoader();
            var response = res.data;
            if(response.type != 'error'){
                showToastMessage(response.type,response.message);
                location.reload(true);
            }
            else{
                showToastMessage(response.type,response.message);
                
            }

        }).catch((err) => { // Fixed syntax here
            myhideLoader();
            showToastMessage('error',err);
            // alert("ERROR");
            console.log(err);
        })
    } 
    else {
        // Passwords do not match - display an error message or take appropriate action
        myhideLoader();
        showToastMessage('error','Passwords Do not match!');
        // alert("ERROR");
        console.log(err);
    }
}


// $(document).on('click', '#ai_side_btn', function() {
//     $('#ai_side_panel').show();
// });

// $(document).on('click', '#ai_side_close', function() {
//     $('#ai_side_panel').hide();
// });


$(document).on('click', '.toggle_read', function() {
    var read_button_text = $(this).text();
    if(read_button_text == " Read More") {
        $(this).text(" Read Less");
        $(this).closest(".textM").find("span.ai_read_text").show();
    } else {
        $(this).text(" Read More");
        $(this).closest(".textM").find("span.ai_read_text").hide();
    }
});

$(document).on("mouseenter", '.message .textM', function() {
    // show closest ul with generate_more class
    $(this).closest(".textM").find(".generate_more").show();
});

$(document).on("mouseleave", '.message .textM', function() {
    $(this).closest(".textM").find(".generate_more").hide();
});

$(document).on('click', '#ai_side_panel .humanize,#ai_side_panel .concise,#ai_side_panel .more_ver, #ai_side_panel .confirm', async function() {
    var myPromptValue = $(this).closest(".textM").find(".ai_textM").text();
    var variation = $(this).text();

    if(variation == "Select") {
        $("textarea#fb_data").val(myPromptValue);
        return;
    }
    $(".chatMessages").append(`<div class='message mMess '>\
            <div class='prof' style="background-color: #ff7b54;">\
                <p>H</p>\
            </div>\
            <div class='messArea'>\
                <p id='sname'>Human</p>\
                <div class='ai_textM'>${variation}</div>\
            </div>\
        </div>`
    );
    $("#content_loader").show();
    let resp = await axios({
        method: 'POST',
        url: baseUrl + '/content_creation_palm',
        data: {
            myPromptValue: myPromptValue,
            variation: variation
        }
    });
   

    
    let candidates = resp.data;
    console.log(candidates)
    addCandidates(candidates);
    $("#content_loader").hide();

});


$(".chatArea .messageBox #message").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#ai_side_panel #send").click();
    }
})

$(document).on('click', '#ai_side_panel #send', async function() {
    var myPromptValue = $("#ai_side_panel #message").val();
    console.log("myPromptValue: "+myPromptValue);
    $("#message").val("");
    if(myPromptValue.trim() == "") {
        return;
    }
    $(".chatMessages").append(`<div class='message mMess'>\
                                    <div class='prof' style="background-color: #ff7b54;">\
                                        <p>H</p>\
                                    </div>\
                                    <div class='messArea'>\
                                        <p id='sname'>Human</p>\
                                        <div class='ai_textM'>${myPromptValue}</div>\
                                    </div>\
                                </div>`
                            );

    $("#content_loader").show();

    let resp = await axios({
        method: 'POST',
        url: baseUrl + '/content_creation_palm',
        data: {
            myPromptValue: myPromptValue,
            variation: ''
        }
    });
    let candidates = resp.data;
    console.log(candidates)
    addCandidates(candidates);
    $("#content_loader").hide();
});


function addCandidates(candidates) {
    $(".chatMessages").append("<div class='message'>\
                                    <div class='prof'>\
                                    <i class='fa fa-robot'></i>\
                                    </div>\
                                    <div class='messArea fadeInRight'>\
                                        <p id='sname'>AI Generator</p>\
                                        <div class='d-flex textRow'></div>\
                                    </div></div>"
                                );  
    for(let i = 0; i < candidates.length; i++) {
        const htmlContent = marked.parse(candidates[i]);
        $(".chatMessages .message .messArea .textRow").last().append(`<div class='textM w-50'><div class="ai_textM mx-1 bg-light shadow">
                                            ${htmlContent}                                                              
                                            </div>
                                            <div class="generate_more my-1">
                                                
                                                <div class="m-0 my-2 row">
                            
                                                <div class="col-6 m-0 px-1"><button class="btn-outline-primary btn elem_generate_more humanize m-0 w-100">Humanize</button></div>
                                                <div class="col-6 m-0 px-1"><button class="btn-outline-primary btn concise elem_generate_more m-0 w-100">Concise</button></div>
                                                </div>
                                                <div class="m-0 row">
                                                <div class="col-6 m-0 px-1"><button class="btn-outline-primary btn elem_generate_more m-0 more_ver w-100">Variation</button></div>
                                                <div class="col-6 m-0 px-1"><button class="btn-outline-primary btn confirm elem_generate_more m-0 w-100">Select</button></div>
                                                </div>
                                            </div>
                                            </div>`);
        $("span.ai_read_text").hide();
    }
}


$(document).ready(function () {

    $("#ai_generator").submit(function (event) {
        event.preventDefault(); // Pre
        // Get the values of the form elements
    });
    $("#save_content").click(function () {
        // $("#ai_generater").modal('hide');
        var textareaValue = $("#ai_content_textarea").val();
        $("#fb_data").val(textareaValue);
        $("#output-text").text(textareaValue);
        $("#ig").text(textareaValue);
        $("#ld-output-text").text(textareaValue);
        $("#tw-output-text").text(textareaValue);
        
        $("#ai_generater").removeClass("in");
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '');
        $("#ai_generater").hide();
           
    });

    // $("#save_content_tw").click(function () {
    //     // $("#ai_generater").modal('hide');
    //     var textareaValue = $("#ai_content_textarea").val();
    //     var maxLength = 263;
       
    //     var text = textareaValue;
    //     var counter=270-text.length;
    //     if (text.length > maxLength) {
    //         var truncatedText = text.substring(0, maxLength) + "......";
    //         $("#myTextarea").val(truncatedText);
    //         $("#output-text").text(truncatedText);
    //         $('#charCount').text('Character count: ' + '0');
    //     }
    //     else{
    //         $("#myTextarea").val(textareaValue);
    //         $("#output-text").text(textareaValue);
    //         $('#charCount').text('Character count: ' + counter);
    //     }
        

    //     $("#ai_generater").removeClass("in");
    //     $(".modal-backdrop").remove();
    //     $('body').removeClass('modal-open');
    //     $('body').css('padding-right', '');
    //     $("#ai_generater").hide();
           
    // });

    // $("#save_content_lkd").click(function () {
    //     // $("#ai_generater").modal('hide');
    //     var textareaValue = $("#ai_content_textarea").val();
    //     $("#message").val(textareaValue);
    //     $("#output-text").text(textareaValue);
        
    //     $("#ai_generater").removeClass("in");
    //     $(".modal-backdrop").remove();
    //     $('body').removeClass('modal-open');
    //     $('body').css('padding-right', '');
    //     $("#ai_generater").hide();
           
    // });


});




// function ig_submitForm() {
   
//     let pages_id=$('#ig_pages').val();
//     let page_content=$('#ig_post_form textarea').val();
//     let img_url=$('input#img_url').val();
//     console.log(img_url);
//     let formData = new FormData();

//     formData.append("pages_id",pages_id);
//     formData.append('page_content',page_content);
//     formData.append('img_url',img_url);
//     formData.append("file_doc", $('#chooseFile')[0].files[0]);

//     if (!pages_id || !page_content ) {
//         alert("Please fill in all the fields ");
//       }
//     else{
//         console.log(pages_id);
//         console.log(page_content);
//         console.log(img_url)
//     showLoader();
    
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    
    
//     axios({
//         method: 'POST',
//         url: baseUrl + '/instagram/ig_post',
//         data:formData
        
//     }).then(res => {
//         var content = res.data;
//         alert(content);
//         location.reload(true);
//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     }).finally(() => {
//         hideLoader();
//     });
//     }
    
// }

// function tw_submitForm() {
//     let profile_id = $('#tw_profiles').val();
//     let profile_content = $('#tw_post_form textarea').val();

//     if (!profile_id || !profile_content) {
//         alert("Please fill in all the fields");
//     } else {
//         console.log(profile_id);
//         console.log(profile_content);
//         let baseUrl = new URL(window.location.href);
//         baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;

//         // Show loading indicator while the request is being processed
//         let loadingElement = document.getElementById('loading');
//         loadingElement.style.display = 'block';

//         axios({
//             method: 'POST',
//             url: baseUrl + '/twitter/tw_post',
//             data: {
//                 profile_id: profile_id,
//                 profile_content: profile_content,
//             }
//         }).then(res => {
//             res = JSON.parse(JSON.stringify(res));
//             alert("Tweet Successfully!");
//         }).catch(err => {
//             alert("ERROR");
//             console.log(err);
//         }).finally(() => {
//             // Hide loading indicator after the request is completed
//             loadingElement.style.display = 'none';
//         });
//     }
// }

function showLoader() {
    let loadingElement = document.getElementById('jumping-dots-loader');
    loadingElement.style.display = 'block';
}

function hideLoader() {
    let loadingElement = document.getElementById('jumping-dots-loader');
    loadingElement.style.display = 'none';
}

function displayImage() {
    const img_url = document.getElementById('img_url').value;
    const imageTag = document.getElementById('imageTag');
    
    // Set the 'src' attribute of the image tag to the entered URL
    imageTag.src = img_url;

    // Show the image container if a URL is provided
    if (img_url) {
        document.getElementById('imageContainer').style.display = 'block';
    } else {
        document.getElementById('imageContainer').style.display = 'none';
    }
}

function tw_submitForm(){

    let profile_id=$('#tw_profiles').val();
    let profile_content=$('#tw_post_form textarea').val();

    if (!profile_id || !profile_content) {
        alert("Please fill in all the fields ");
      }

    else{
        console.log(profile_id);
        console.log(profile_content);
        axios({
            method: 'POST',
            url: baseUrl + '/twitter/tw_post',
            data: {
                profile_id:profile_id,
                profile_content:profile_content,  
            }
        }).then(res => {
            res = JSON.parse(JSON.stringify(res));
            alert("Tweet Successfully!");
            location.reload(true);
        }).catch(err =>{
            alert("ERROR");
            console.log(err);
        })

    }
}

function tw_generate() {
    let profilename = []
    let mydata = []
    let profile_ids=$('#tw_profiles').val()
    let profile_title=$('input#mytitle').val();
    $('.selectpicker#tw_profiles :selected').each(function(i, selected_text) {
        profilename.push($(selected_text).text())
    })
    console.log(profile_ids)
    console.log(profilename)
    console.log(profile_title)

    axios({
        method: 'POST',
        url: baseUrl + '/content_creation',
        data: {
            profile_ids:profile_ids,
            profilename:profilename,
            profile_title:profile_title
        }
    }).then(res => {
        var content = res.data;
        console.log(content)
        for(let i=0;i<profile_ids.length; i++) {
            mydata.push([profile_ids[i], profilename[i], content[i]])}
        console.log(mydata);
        generateElements_tw(mydata)
        // var unhideButton = document.getElementById("postall");
        // const messageTextarea = document.getElementById("message");
        // var label = document.querySelector('label[for="message"]');
        // label.style.display = "none";
        // messageTextarea.style.display = "none";
        // unhideButton.style.display = "block";
        alert("Sucessfull");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    })
    
}


function lkd_submitForm() {

    let formData = new FormData();
    var canvas = $(".mycanvas");
    var canvasName = canvas.attr("name");
    formData.append("profile_ids",$('#lkd_option').val());
    formData.append("myurl",$('#web_url').val());
    formData.append("profile_content",$('#lkd_post_form textarea').val());
    formData.append("file_doc", $('#chooseFile')[0].files[0]);
    if (typeof canvasName === 'undefined') {
        console.log("Undefined!");
    } else {
        formData.append("canvas_image", canvasName);
        console.log("Canvas Name:", canvasName);
    }

    showLoader();
    
    axios({
        method: 'POST',
        url: baseUrl + '/linkedin/ld_post',
        data: formData
    }).then(res => {
        res = JSON.parse(JSON.stringify(res));
        alert("Post Successfully!");
        location.reload(true);
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    }).finally(() => {
        hideLoader();
    });
    }
    

function lkd_generate() {
    let profilename = []
    let mydata = []
    let profile_ids=$('#lkd_option').val();
    let profile_title=$('input#mytitle').val();
    $('.selectpicker#lkd_option :selected').each(function(i, selected_text) {
        profilename.push($(selected_text).text())
    })
    console.log(profile_ids)
    console.log(profilename)
    console.log(profile_title)
    showLoader();
    axios({
        method: 'POST',
        url: baseUrl + '/content_creation',
        data: {
            profile_ids:profile_ids,
            profilename:profilename,
            profile_title:profile_title
        }
    }).then(res => {
        var content = res.data;
        console.log(content)
        for(let i=0;i<profile_ids.length; i++) {
            mydata.push([profile_ids[i], profilename[i], content[i]])}
        console.log(mydata);
        generateCollapseElements(mydata)
        var unhideButton = document.getElementById("postall");
        const messageTextarea = document.getElementById("message");
        var label = document.querySelector('label[for="message"]');
        label.style.display = "none";
        messageTextarea.style.display = "none";
        unhideButton.style.display = "block";
        alert("Sucessfull");

    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    }).finally(() => {
        hideLoader();
    });
    
}
function generateElements_fb(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]

      
        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
                    <section class="mypost">
                    <form action="#">
                      <div class="mycontent">
                        <img src="/static/images/user2.png">
                        <div class="details">
                          <p>${profile_name}</p>
                        </div>
                      </div>
                      
                      <textarea  id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false">${message}</textarea>
                      
                    </form>
                    <div class="fbutton">
                      
                      <div class="sub"><img src="/static/images/like.png">Like</div>
                      <div class="sub"><img src="/static/images/comment.png">Comment</div>
                      <div class="sub"><img src="/static/images/share.png">Share</div>
                    </div>
                  </section>   
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}
function generateElements_tw(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]

      
        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
                    <section class="mypost">
          <form action="#">
            <div class="mycontent">
              <img src="/static/images/tw_logo.png">
              <div class="details">
                <p>${profile_name}</p>
                <p2>Twitter</p2>
              </div>
            </div>
            
            <div id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false" readonly >${message}</div>    
          </form>
          <div class="fbutton">
            
            <div class="sub"><img src="/static/images/tw_comment.png"></div>
            <div class="sub"><img src="/static/images/tw_share.png"></div>
            <div class="sub"><img src="/static/images/tw_like.png"></div>
            <div class="sub"><img src="/static/images/tw_upload.png"></div>
          </div>
        </section>
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}
function generateCollapseElements(data) {
    console.log(data)
    $("#collapseContainer").empty();
    for (let i = 0; i < data.length; i++) {
        const collapseId = `collapse${i}`;
        const headingId = `heading${i}`;
        const contentId = `content${i}`;
        let profile_name=data[i][1]
        let message=data[i][2]


        const collapseElement = `
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${contentId}" aria-expanded="true" aria-controls="${contentId}">
                        ${profile_name}
                        </button>
                    </h2>
                </div>
            
                <div id="${contentId}" class="collapse" aria-labelledby="${headingId}" data-parent="#collapseContainer">
                    <div class="card-body">
        
                        <section class="mypost">
                        <form action="#">
                        <div class="mycontent">
                        <img src="/static/images/lkd_logo.png">
                        <div class="details">
                            <p>${profile_name}</p>
                            <p2>LinkedIn</p2>
                            </div>
                </div>
                
                <textarea  id="output-text" class="myfbview" placeholder="What's on your mind, CodeWithNepal?" spellcheck="false" readonly >${message}</textarea>
                
              </form>
              <div class="fbutton">
                
              <div class="sub"><img src="/static/images/lkd_like.png">Like</div>
              <div class="sub"><img src="/static/images/ld_comment.png">Comment</div>
              <div class="sub"><img src="/static/images/ld_share.png">Share</div>
              <div class="sub"><img src="/static/images/ld_upload.png">Send</div>
            </div>
            </section>    
                    
                    
                </div>
                </div>
            </div>
        `;
        $("#collapseContainer").append(collapseElement);
    }
}



// $(document).on('submit','#lkd_post_form', function(e){
//     e.preventDefault();

//     let profile_ids=$('#lkd_option').val();
//     let profile_content=$('#lkd_post_form textarea').val();

//     if (!profile_ids || !profile_content) {
//         alert("Please fill in all the fields ");
//       }
//     else{

//     console.log(profile_ids);
//     console.log(profile_content);
//     let baseUrl = new URL(window.location.href);
//     baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
//     axios({
//         method: 'POST',
//         url: baseUrl + '/linkedin/ld_post',
//         data: {
//             profile_ids:profile_ids,
//             profile_content:profile_content,  
//         }
//     }).then(res => {
//         res = JSON.parse(JSON.stringify(res));
//         alert("Post Successfully!");
//     }).catch(err =>{
//         alert("ERROR");
//         console.log(err);
//     })
//     }
    
// })
function create_user(){

    let client_ids=$('#client_ids').val();
    let uname=$('#name').val();
    let uemail=$('#NewUserEmail').val();
    let pass=$('#password').val();
    let repass=$('#repassword').val();
    let userTimezone=Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log(client_ids)
    if (!client_ids || !uname || !pass || !repass) {
        alert("Please fill in all the fields ");
    }
    else if(pass!=repass)
    {
        alert("Password aren't same ");
    }
    else{
    myshowLoader();
    axios({
        method: 'POST',
        url: baseUrl + '/add_member',
        data: {
            client_ids:client_ids,
            uname:uname,
            uemail:uemail,
            pass:pass,
            userTimezone:userTimezone
        }
    }).then(res => {
        myhideLoader();
        var response = res.data;
        showToastMessage(response.type,response.message);
        if(response.type!='error'){
        location.reload(true);
        }
        
    }).catch(err =>{
        myhideLoader();
        showToastMessage('error',err);
        // alert("ERROR");
        console.log(err);
    })
    }
}


$('#submit_user').click(function(){


    let client_ids=$('#client_ids').val();
    let role=$('#role').val();
    let managerID=$('#selectManager').val();
    let uname=$('#name').val();
    let uemail=$('#NewUserEmail').val();
    let pass=$('#password').val();
    let repass=$('#repassword').val();
    let userTimezone=Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log(client_ids)
    if (!role || !uname || !pass || !repass) {
            alert("Please fill in all the fields ");
        }
    else if(pass!=repass){
            alert("Password aren't same ");
        }
    else{
    myshowLoader();
    axios({
        method: 'POST',
        url: baseUrl + '/add_user',
        data: {
            client_ids:client_ids,
            managerID:managerID,
            role:role,
            uname:uname,
            uemail:uemail,
            pass:pass,
            userTimezone:userTimezone
        }
    }).then(res => {
        myhideLoader();
        var response = res.data;
        showToastMessage(response.type,response.message);
        if(response.type!='error'){
            location.reload(true);
        }
        
        
        
        
    }).catch(err =>{
        myhideLoader();
        showToastMessage('error',err);
        // alert("ERROR");
        console.log(err);
    })
    }
    
});



function add_brand(){
    
    let brand_name=$('#brand_name').val();
    let brand_color=$('span#value').text();
    let brand_icon_url=$("#logoimagecanvas").attr('src');
    let brand_users=$("#brand_users").val();
    
    if (!brand_name || !brand_color || !brand_icon_url || !brand_users) {
        showToastMessage("error", "Please fill in all the required fields");
       
    }
    else{
    axios({
        method: 'POST',
        url: baseUrl + '/add_client',
        data:{

            brand_name:brand_name,
            brand_color:brand_color,
            brand_icon_url:brand_icon_url,
            brand_users:brand_users
        }
        
    }).then(res => {
        var post_id = res.data;
        showToastMessage("success","Brand Created Successfully!");
        location.reload(true);
        
    }).catch(err =>{
        showToastMessage("error","Something went wrong! Try Again");
        console.log(err);
    })}
  
    
}
function generate_report(){
    let todate=$('#to_date').val();
    let fromdate=$('#from_date').val();
    let client_id=$('#client_type').val();
    let social_type=$('#social_type').val();
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/postmedia_report',
        data: {
            todate:todate,
            fromdate:fromdate,
            client_id:client_id,
            social_type:social_type
        }
    }).then(res => {
        var post_id = res.data;
        console.log(post_id)
                    const tableHTML = `
                    <table class="report_table text-capitalize table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Social Media</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${post_id.map(data => `
                                <tr>
                                    <td>${data[0]}</td>
                                    <td>${data[1]}</td>
                                    <td>${data[2]}</td>
                                    <td>${data[3]}</td>
                                    <td>${data[4]}</td>
                                    <td>${data[5]}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                $('.report_section').html(tableHTML);
                $('#downloadButton').removeClass('btn-secondary disabled');    
       
        
    }).catch(err =>{
        alert("ERROR");
        console.log(err);
    });
}



    
    


// function convertToUserTimeZone(dateString) {
    

//     const date = new Date(dateString);

//     // Get the user's time zone
//     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//     // Create a formatter with the user's time zone
//     const formatter = new Intl.DateTimeFormat('en-US', {
//         timeZone: userTimeZone,
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//         timeZoneName: 'short'
//     });

//     // Format the date in the user's time zone
//     const formattedDate = formatter.format(date);

//     console.log("US date",dateString)
//     console.log("MY time Zone ",userTimeZone)
//     console.log("Convert TIme",formattedDate)
//     return formattedDate;
  
// }
  



function logout() {
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    console.log("Im At Logout");
    window.location.replace(baseUrl+"/logout");
}



$('[data-id="model"]').on('click', function(){
    var thisModel = $(this).data('target');
    $(thisModel).show();
    $(thisModel).find('[data-close="model"]').click(function(){ 
      $(thisModel).hide();
    });
    $(window).click(function(event){
      if('#'+event.target.id == thisModel){
        $(thisModel).hide();
      }
    });
  });

