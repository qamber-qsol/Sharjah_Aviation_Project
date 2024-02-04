// DOM elements
const DOMstrings = {
	stepsBtnClass: 'multisteps-form__progress-btn',
	stepsBtns: document.querySelectorAll('.multisteps-form__progress-btn'),
	stepsBar: document.querySelector('.multisteps-form__progress'),
	stepsForm: document.querySelector('.multisteps-form__form'),
	stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
	stepFormPanelClass: 'multisteps-form__panel',
	stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
	stepPrevBtnClass: 'js-btn-prev',
	stepNextBtnClass: 'js-btn-next',
  };
  let formData = new FormData();
  // Variable to store the current step
  let currentStep = 0;
  var socialIDs = []; 
  // Function to update the step display
  const updateStepDisplay = () => {
	console.log(`Current Step: ${currentStep + 1}`);
  };
  
  // Function to remove a class from a set of items
  const removeClasses = (elemSet, className) => {
	elemSet.forEach(elem => {
	  elem.classList.remove(className);
	});
  };
  
  // Function to find the exact parent node of an element
  const findParent = (elem, parentClass) => {
	let currentNode = elem;
	while (!currentNode.classList.contains(parentClass)) {
	  currentNode = currentNode.parentNode;
	}
	return currentNode;
  };
  
  // Function to get the active button's step number
  const getActiveStep = elem => {
	return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  // Function to set all steps before and including the clicked step to active
  const setActiveStep = activeStepNum => {
	removeClasses(DOMstrings.stepsBtns, 'js-active');
	DOMstrings.stepsBtns.forEach((elem, index) => {
	  if (index <= activeStepNum) {
		elem.classList.add('js-active');
	  }
	});
  };
  
  // Function to get the active panel
  const getActivePanel = () => {
	let activePanel;
	DOMstrings.stepFormPanels.forEach(elem => {
	  if (elem.classList.contains('js-active')) {
		activePanel = elem;
	  }
	});
	return activePanel;
  };
  
  // Function to open the active panel and close inactive panels
  const setActivePanel = activePanelNum => {
	removeClasses(DOMstrings.stepFormPanels, 'js-active');
	DOMstrings.stepFormPanels.forEach((elem, index) => {
	  if (index === activePanelNum) {
		elem.classList.add('js-active');
		setFormHeight(elem);
	  }
	});
  };
  
  // Function to set form height equal to the current panel height
  const formHeight = activePanel => {
	const activePanelHeight = activePanel.offsetHeight;
	DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  };
  
  const setFormHeight = () => {
	const activePanel = getActivePanel();
	formHeight(activePanel);
  };
  
  // Event listener for steps bar click
//   DOMstrings.stepsBar.addEventListener('click', e => {
// 	const eventTarget = e.target;
// 	if (!eventTarget.classList.contains(DOMstrings.stepsBtnClass)) {
// 	  return;
// 	}
// 	const activeStep = getActiveStep(eventTarget);
// 	setActiveStep(activeStep);
// 	setActivePanel(activeStep);
// 	currentStep = activeStep;
	
//   });
  
  // Event listener for Prev/Next button click
  DOMstrings.stepsForm.addEventListener('click', e => {
	
	const eventTarget = e.target;
	if (
	  !(
		eventTarget.classList.contains(DOMstrings.stepPrevBtnClass) ||
		eventTarget.classList.contains(DOMstrings.stepNextBtnClass)
	  )
	) {
	  return;
	}
	const activePanel = findParent(eventTarget, DOMstrings.stepFormPanelClass);
	let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
	if (eventTarget.classList.contains(DOMstrings.stepPrevBtnClass)) {
	  activePanelNum--;
	} else {
	  activePanelNum++;
	}
	console.log("STEP: ",activePanelNum," Completed!")
	if (activePanelNum==1){
		let file_doc= $('#csvFileInput')[0].files[0];
		if (!file_doc) {
			alert('Please Select a File');
		}
		else{
			formData.append("file_doc",file_doc);
				AishowLoader();
				let baseUrl = new URL(window.location.href);
			baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
			axios({
				method: 'POST',
				url: baseUrl + '/bulkuploads/bulkUp',
				data: formData
			}).then(res => {
				var dataArray = res.data;
				console.log(dataArray);
				AihideLoader();
				setActiveStep(activePanelNum);
				setActivePanel(activePanelNum);
				// Assuming your JSON response is stored in a variable called "dataArray"
				const tableHTML = `
				<table class="report_table table table-hover text-capitalize">
					<thead>
						<tr>
							<th>Content</th>
							<th>Media-Url</th>
							<th>Type</th>
							<th>Date/Time</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						${dataArray.map(data => `
							<tr>
								<td>${data.Text}</td>
								<td><a href="${data.ImageUrl}" target="_blank">${data.ImageUrl}</a></td>
								<td>${data.postType}</td>
								<td>${data.Datetime}</td>
								<td class="${data.status}">${data.status}</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				`;

				$('#reviewData').html(tableHTML);

				// location.reload(true);
			}).catch(err =>{
				alert("Please! Upload In Correct Format");
			    location.reload(true);
			});
		}
	
	}
	else if(activePanelNum==2){
		
		$('input[type="checkbox"]:checked').each(function () {
			const social_type = $(this).attr('name');
			const inputValue = $(this).attr('id');
			socialIDs.push({ social_type, inputValue });
		});
		if (socialIDs.length === 0) {

			alert("Please select Social ID's");

		} else {
			console.log(socialIDs); 
			setActiveStep(activePanelNum);
			setActivePanel(activePanelNum);	
		}
		
	}
	
	else if(activePanelNum==3){
		let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		let baseUrl = new URL(window.location.href);
		myshowLoader();
		baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
		console.log(socialIDs)
		axios({
			method: 'POST',
			url: baseUrl + '/bulkuploads/finalizeBulkUpload',
			data: {
				socialIDs:socialIDs,
				userTimezone:userTimezone,
			}
		}).then(res => {
			myhideLoader();
			// myhideLoader()
			// $(this).closest("#queueTab").fadeOut(600, function() {
			//     $(this).remove();
			// });
			
			console.log("Post Successfully!");
			setActiveStep(activePanelNum);
			setActivePanel(activePanelNum);	

		}).catch(err =>{
			myhideLoader();
			alert("Something Went Wrong! Try Again");
			console.log(err);
		});
    }

	else{
		setActiveStep(activePanelNum);
		setActivePanel(activePanelNum);
	}

	
	
});
  
  // Setting proper form height onload and onresize
  window.addEventListener('load', setFormHeight, false);
  window.addEventListener('resize', setFormHeight, false);
   
  const setAnimationType = newType => {
	DOMstrings.stepFormPanels.forEach(elem => {
	  elem.dataset.animation = newType;
	});
  };
  
  setAnimationType('slideHorz');
  