var localization_ru =  {
    'Add Drawer': 'Добавить холст для рисования',
    'Insert Drawer': 'Добавить холст',
    'Insert': 'Добавить',
    'Free drawing mode': 'Карандаш',
    'SimpleWhiteEraser': 'Ластик (белый)',
    'Eraser': 'Ластик',
    'Delete this canvas': 'Удалить полотно',
    'Are you sure want to delete this canvas?': 'Вы уверены что хотите удалить полотно?',


    // canvas properties popup
    'Size (px)': 'Размер (px)',
    'Position': 'Позиция',
    'Inline': 'На линии',
    'Left': '0',
    'Center': '0',
    'Right': '0',
    'Floating': 'Плавающий',
    'Canvas properties': 'Свойства холста',
    'Background': 'Фон',
    'transparent': 'прозрачный',
    'Cancel': 'Отмена',
    'Save': 'Сохранить',

    // Fullscreen plugin
    'Enter fullscreen mode': 'Полноэкранный режим',
    'Exit fullscreen mode': 'Выйти из полноэкранного режима',

    // shape context menu plugin
    'Bring forward': 'Переместить выше',
    'Send backwards': 'Переместить ниже',
    'Bring to front': 'Переместить наверх',
    'Send to back': 'Переместить в низ',
    'Duplicate': 'Клонировать',
    'Remove': 'Удалить',

    // brush size plugin
    'Size:': 'Размер:',

    // colorpicker plugin
    'Fill:': 'Заливка:',
    'Transparent': 'Прозрачный',
    'None': 'Нет',

    // shape border plugin
    'Border:': 'Граница:',

    // arrow plugin
    'Draw an arrow': 'Стрелка',
    'Draw a two-sided arrow': 'Двухсторонняя стрелка',
    'Lines and arrows': 'Линии и стрелки',

    // circle plugin
    'Draw a circle': 'Круг',

    // line plugin
    'Draw a line': 'Линия',

    // rectangle plugin
    'Draw a rectangle': 'Прямоугольник',

    // triangle plugin
    'Draw a triangle': 'Треугольник',

    // polygon plugin
    'Draw a Polygon': 'Многоугольник',
    'Stop drawing a polygon': 'Закончить рисование многоугольника (esc)',
    'Click to start a new line': 'Кликните для начала новой линии',

    // text plugin
    'Draw a text': 'Текст',
    'Click to place a text': 'Нажмите, чтобы расположить текст',
    'Font:': 'Шрифт:',

    // movable floating mode plugin
    'Move canvas': 'Подвинуть холст',

    // base shape
    'Click to start drawing a ': 'Нажмите, чтобы начать рисовать ',

    // image tool
    'Insert an image'          : 'Вставить изображение',
    'No file was selected!'    : 'Не был выбран файл!',
    'Incorrect file type'      : 'Неверный тип файла!',
    'File is to big!. Maximum file size is '   : 'Файл слишком большой! Максимальный размер файла - ',
    'Image failed to create!'  : 'Не удалось создать изображение!',

    // background image tool
    'Insert a background image': 'Фоновое изображение'
};


$(document).ready(function(){
    $(".aspect_radio").click(function(){
        var selectedValue = $(this).val();
        var dimensions = selectedValue.split("x");
        var mywidth = dimensions[0];
        var myheight = dimensions[1];
        printDimensions(mywidth, myheight)

    });
    $(".aspect_radio").click();
});


function printDimensions(mywidth,myheight) {
       
   
    // var canvasEditor = document.getElementById("canvas-editor");
    // canvasEditor.removeChild(canvasEditor.firstChild);
    var drawerPlugins = [
        // Drawing tools
        'Pencil',
        'Eraser',
        'Text',
        'Line',
        'ArrowOneSide',
        'ArrowTwoSide',
        'Triangle',
        'Rectangle',
        'Circle',
        'Image',
        'BackgroundImage',
        'Polygon',

        // Drawing options
        //'ColorHtml5',
        'Color',
        'ShapeBorder',
        'BrushSize',
        'OpacityOption',
        'LineWidth',
        'StrokeWidth',

        
        'ShapeContextMenu',
        'CloseButton',
        'OvercanvasPopup',
        'OpenPopupButton',
        'MinimizeButton',
        'ToggleVisibilityButton',
        'MovableFloatingMode',
        'FullscreenModeButton',
        'Zoom',
        'TextLineHeight',
        'TextAlign',

        'TextFontFamily',
        'TextFontSize',
        'TextFontWeight',
        'TextFontStyle',
        'TextDecoration',
        'TextColor',
        'TextBackgroundColor'
    ];

    

    // drawer is created as global property solely for debug purposes.
    // doing  in production is considered as bad practice
    window.drawer = new DrawerJs.Drawer(null, {
        //texts: localization_ru,
        exitOnOutsideClick: false,
        plugins: drawerPlugins,
        pluginsConfig: {
            Image: {
                scaleDownLargeImage: true,
                maxImageSizeKb: 1024 //1MB
            },
            BackgroundImage: {
                scaleDownLargeImage: true,
                maxImageSizeKb: 1024, //1MB
                imagePosition: 'stretch',  // one of  'center', 'stretch', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
                acceptedMIMETypes: ['image/jpeg', 'image/png', 'image/gif'] ,
                dynamicRepositionImage: true,
                dynamicRepositionImageThrottle: 100
            }
        },
        toolbars: {
            drawingTools: {
                position: 'top',
                positionType: 'outside',
                customAnchorSelector: '#custom-toolbar-here',
                compactType: 'scrollable',
                hidden: false,
                toggleVisibilityButton: false,
                fullscreenMode: {
                    position: 'top',
                    hidden: false,
                    toggleVisibilityButton: false
                }
            },
            toolOptions: {
                position: 'bottom',
                positionType: 'outside',
                compactType: 'scrollable',
                hidden: false,
                toggleVisibilityButton: false,
                fullscreenMode: {
                    position: 'bottom',
                    compactType: 'popup',
                    hidden: false,
                    toggleVisibilityButton: false
                }
            },
            settings : {
                position : 'right',
                positionType: 'outside',
                compactType : 'scrollable',
                hidden: false,
                toggleVisibilityButton: false,
                fullscreenMode: {
                    position : 'right',
                    hidden: false,
                    toggleVisibilityButton: false
                }
            }
        },
        defaultImageUrl: '/DrawerJs/examples/redactor/images/drawer.jpg',
        defaultActivePlugin : { name : 'Pencil', mode : 'lastUsed'},
        debug: true,
        transparentBackground: true,
        align: 'inline'  //one of 'left', 'right', 'center', 'inline', 'floating'
    },mywidth,myheight);
   
    $('#canvas-editor').html(window.drawer.getHtml());
    window.drawer.onInsert();

    setClickHandlers();
    $("#canvas-editor img").click();
}


function onStartEditing() {
    window.drawer.api.startEditing();
}
function onStopEditing() {
    window.drawer.api.stopEditing();
}
function onMinimize() {
    drawer.api.minimizeCanvas()
}
function onRestore() {
    drawer.api.restoreCanvas()
}
function onFullscreenOn() {
    drawer.api.fullscreenOn()
}
function onSetZoom() {
    var zoomValueRaw = parseFloat($('#zoom-value').val()),
        zoomValue = isFinite(zoomValueRaw) ? zoomValueRaw : 1,
        zoomCenterX = parseInt($('#zoom-x-center').val(), 10),
        zoomCenterY = parseInt($('#zoom-y-center').val(), 10);
    drawer.api.setZoom(zoomValue, zoomCenterX, zoomCenterY);
}
function onRestoreDefaultZoom() {
    drawer.api.restoreDefaultZoom();
}
function onFullscreenOff() {
    drawer.api.fullscreenOff()
}
function onLoad() {
    window.drawer.api.loadCanvasFromData(sessionStorage.drawerJsData);
}
function onSave() {
    var serializedData = window.drawer.api.getCanvasAsJSON();
    console.log(serializedData);
    sessionStorage.drawerJsData = serializedData;
}

async function insertImage() {
    const img_src = $("input[name='google_images']:checked").next().attr('src');
    console.log(img_src);
    base64_data = await getBase64FromUrl(img_src);
    // console.log("BASE64 data: ", base64_data);
    
    var options = {};
    // window.drawer.api.addImageFromUrl(img_src, options);
    var imagePlugin = window.drawer.getPluginInstance('Image');
    // console.log(imagePlugin);
    imagePlugin.loadImage(base64_data, options);


}

async function insertFrame() {
    const frame_src = $("input[name='myframe']:checked").next().attr('src');
    console.log(frame_src);
    base64_data = await getBase64FromUrl(frame_src); 
    var options = {};
    var imagePlugin = window.drawer.getPluginInstance('Image');
    imagePlugin.loadImage(base64_data, options);


}


const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
            const base64data = reader.result;   
            resolve(base64data);
        }
    });
}

function onSaveImage() {
    
    var myurl = window.drawer.api.getCanvasAsImage();
    var $image = $("<img class='mycanvas'>");
    $image.attr("src", myurl);
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

        backtoposting();

    }).catch(err =>{
        
        console.log(err);
    })
    // window.drawer.api.saveCanvas();
    
}

function onSaveImage_allSocial(){
    var myurl = window.drawer.api.getCanvasAsImage();
    var $image = $("<img class='mycanvas'>");
    $image.attr("src", myurl);
    $('#ImagePinterest').attr("src", myurl);
    console.log(myurl);
    let formData = new FormData();
    formData.append("canvas_data",myurl);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    myshowLoader();
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
        myhideLoader();
        backtoposting();

    }).catch(err =>{
        myhideLoader();
        console.log(err);
    })
    


}


function onSchImage() {
    
    var myurl = window.drawer.api.getCanvasAsImage();

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

        backtoposting();

    }).catch(err =>{
        
        console.log(err);
    })
   
    
}

function onSaveImage_ig() {
    
    var myurl = window.drawer.api.getCanvasAsImage();

    var $image = $("<img class='mycanvas'>");
    $image.attr("src", myurl);
    console.log(myurl);
    let formData = new FormData();
    formData.append("canvas_data",myurl);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/ig_upload',
        data: formData
    }).then(res => {
        var dataArray = res.data;
        console.log(dataArray);
        let divempty = $(".url_preview");
        let urlPreviewDiv = $(".image_preview");
        divempty.empty();
        console.log("All Good");
        urlPreviewDiv.html($image);
        $(".mycanvas").attr('name', dataArray);
        $('#img_url').val(dataArray);
        backtoposting();

    }).catch(err =>{
        
        console.log(err);
    })
    // window.drawer.api.saveCanvas();
    
}

function onsave_schig() {
    
    var myurl = window.drawer.api.getCanvasAsImage();

    var $image = $("<img class='mycanvas'>");
    $image.attr("src", myurl);
    console.log(myurl);
    let formData = new FormData();
    formData.append("canvas_data",myurl);
    let baseUrl = new URL(window.location.href);
    baseUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`;
    axios({
        method: 'POST',
        url: baseUrl + '/ig_upload',
        data: formData
    }).then(res => {
        var dataArray = res.data;
        console.log(dataArray);
        const imagetitle = `<div id="canvas_name" class="bg-success h4 m-0 p-2 rounded shadow text-light">${dataArray}</div>`;
        $('.canvas_card').html(imagetitle); 
        $('.canvas_card').css('display', 'block');
        $('.file-upload').css('display','none')
        $('#img_url').val(dataArray);
        backtoposting();

    }).catch(err =>{
        
        console.log(err);
    })
    // window.drawer.api.saveCanvas();
    
}

function backtoposting(){
    $(".panel-wrap2").toggleClass("panel-visible");   
}

// function movetoedit(){

//     $(".dashboard").toggleClass("dashboard-compact");
//     $('#postsection').removeClass('show active');
//     $('#editsection').addClass('fade show active');     

// }

function onBackgroundSelectorClick(el) {
    $('.bg-image-selector').removeClass('checked');
    $(el).addClass('checked');
}
function onBackgroundImageButtonClick (btn) {
    console.log('onBackgroundImageClick()');
    var imgEl = $('.bg-image-selector.checked img')[0];

    var position = $('.bg-positions-list :checked')[0].value;
    console.log('pos = ', position);

    drawer.api.setBackgroundImage(imgEl, {'imagePosition' : position});
}

function onBackgroundImageSelectButtonClick (btn) {
    var imgSrc = $('#bg-url-select :checked').val();
    console.log('onBackgroundImageClick(): imgSrc=', imgSrc);

    var position = $('.bg-positions-list :checked')[0].value;
    console.log('pos = ', position);

    drawer.api.setBackgroundImageFromUrl(imgSrc, {'imagePosition' : position});
}

function onSetActiveColorClick(btn) {
    var color = $('#active-color').val();
    drawer.api.setActiveColor(color);
}

function onCreateTextButtonClick(btn) {
    var left = $('#create-text-position-left').val(),
        top = $('#create-text-position-top').val(),
        text = $('#create-text-value').val();
    drawer.api.createText(left, top, text);
}

/***********************************************************************************************
 * IMAGE API
 ************************************************************************************************/

function onImageSelectorClick(el) {
    $('.image-selector').removeClass('checked');
    $(el).addClass('checked');
}
function onImageButtonClick (btn) {
    console.log('onImageButtonClick()');
    var imgEl = $('.image-selector.checked img')[0];

    var options = {};
    options.scaleDownLargeImage = $('#img-opt-fit-image').attr('checked');
    options.centerImage = $('#img-opt-center-image').attr('checked');

    if (!options.scaleDownLargeImage) {
        options.left = Number.parseInt($('#img-opt-left').val());
        options.top = Number.parseInt($('#img-opt-top').val());
        options.scaleX = Number.parseFloat($('#img-opt-scalex').val());
        options.scaleY = Number.parseFloat($('#img-opt-scaley').val());
    }
    console.log('onImageButtonClick() options:', options);

    drawer.api.addImage(imgEl, options);
}


function onImageSelectButtonClick (btn) {
    var imgSrc = $('#img-url-select :checked').val();
    console.log('onBackgroundImageClick(): imgSrc=', imgSrc);

    var options = {};
    var position = $('.bg-positions-list :checked')[0].value;
    console.log('pos = ', position);

    drawer.api.addImageFromUrl(imgSrc, options);
}

/***********************************************************************************************
 * SIZE API
 ************************************************************************************************/
function onSliderUpdate(slider) {
    var val = $(slider).val();
    $(slider).parent().find('.slider-val').html(val);
    return true;
}

function onSetSizeClick(btn) {
    var width = $('#resize-width').val();
    var height = $('#resize-height').val();
    
    drawer.api.setSize(width, height);
}

/***********************************************************************************************
 * CONFIG RELOAD API
 ************************************************************************************************/
function onUpdateConfigClick() {
    var plugins = [];
    $('.plugin-list :checked').each(function(i, $el) {
        plugins.push($el.value);
    });

    console.log('plugins:', plugins);
    var options = {plugins: plugins};

    drawer.api.updateOptions(options);
}


/***********************************************************************************************
* SELECTED OBJECT API
************************************************************************************************/
var selectedObject;

function onGetSelectedObject() {
    selectedObject = window.drawer.api.getSelectedObject();
}
function onRemoveObject() {
    window.drawer.api.removeObject(selectedObject);
}
function onDuplicateObject() {
    window.drawer.api.duplicateObject(selectedObject);
}
function onBringObjectForward() {
    window.drawer.api.bringObjectForward(selectedObject);
}
function onSendObjectBackwards() {
    window.drawer.api.sendObjectBackwards(selectedObject);
}
function onBringObjectToFront() {
    window.drawer.api.bringObjectToFront(selectedObject);
}
function onSendObjectToBack() {
    window.drawer.api.sendObjectToBack(selectedObject);
}
/***********************************************************************************************
 * CONTEXT MENU  API
 ************************************************************************************************/

function onContextMenuSetPositionClick(evt) {
    var left, top, fitInViewPort;
    left = $('#context-menu-position-left').val();
    top  = $('#context-menu-position-top').val();
    fitInViewPort = $('#context-menu-fit-viewport-check').attr('checked');

    console.log('onContextMenuSetPositionClick: ',left, top, fitInViewPort);
    drawer.api.contextMenuSetPosition(left, top, fitInViewPort);

    evt.preventDefault();
    return false;
}


function onContextMenuUseCustomRenderer(evt) {
    if ($(this).attr('checked')) {
        var optionsUpdate = {
            pluginsConfig : {
                ShapeContextMenu : {
                    customMenuRenderer : contextMenuCustomRenderer
                }
            }
        };

    } else {
        var optionsUpdate = {
            pluginsConfig : {
                ShapeContextMenu : {
                    customMenuRenderer : null
                }
            }
        };

        drawer.api.updateOptions(optionsUpdate);
    }

    drawer.api.unloadPlugin('ShapeContextMenu');
    drawer.api.updateOptions(optionsUpdate);
    drawer.api.loadPlugin('ShapeContextMenu');

    // hack to set plugin handlers, or they will load only on toolbar creation;
    var plugin = drawer.getPluginInstance('ShapeContextMenu');
    plugin._setHandlers();
}


function contextMenuCustomRenderer(evt) {
    console.log(evt);
    console.log('---CUSTOM RENDER HERE---');
    alert('---CUSTOM RENDER HERE---');
}

function setClickHandlers() {
    $('#context-menu-set-position-btn').click(onContextMenuSetPositionClick);
    $('#context-menu-custom-renderer').click(onContextMenuUseCustomRenderer);
}
