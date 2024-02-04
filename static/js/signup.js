$(document).ready(function() {
    var $btnRegister = $("input.btnRegister");
    var $password = $("#password");
    var $confirmPassword = $("#confirmPassword");
    var $formControls = $("input.form-control");
    var $selectControls = $("select.form-control");
    var $termsCheckbox = $("#terms_and_conditions");

    $btnRegister.prop("disabled", true).addClass("btn btn-secondary text-light");

    $termsCheckbox.change(function() {
      if (this.checked) {
        $btnRegister.prop("disabled", false).removeClass("btn-secondary");
      } else {
        $btnRegister.prop("disabled", true).addClass("btn-secondary");
      }
    });

    $btnRegister.click(function(event) {
      event.preventDefault();

      var OrganizationData = [];
      var password = $password.val().trim();
      var confirmPassword = $confirmPassword.val().trim();

      if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return;
      }

      $formControls.each(function() {
        var inputValue = $(this).val().trim();
        if (inputValue === "") {
          alert("Please fill in all fields.");
          return false;
        }
        OrganizationData.push(inputValue);
      });

      $selectControls.each(function() {
        var selectValue = $(this).val();
        console.log("ORG TYPE");
        console.log(selectValue)
        if (selectValue === null) {
          alert("Please select an Organization Type.");
          return false;
        }
        OrganizationData.push(selectValue);
      });

      console.log("Input Values:", OrganizationData);

      let baseUrl = new URL(window.location.href);
      baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
      myshowLoader();
      axios({
          method: 'POST',
          url: baseUrl + '/RegisterOrganization',
          data: {
            OrganizationData:OrganizationData
          }  
      }).then(res => {
        myhideLoader();
        let response = res.data;

        if (response.type!='error')
        {
          $('#home').removeClass('show active');
          $('#profile').addClass('fade show active'); 
        } 
        else{
          alert(response.message);
        }  

      }).catch(err => {
          console.error(err);
      });


    });
  
  

  });