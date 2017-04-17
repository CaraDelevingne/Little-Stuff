/*2017.1.12 图片上传及压缩预览*/


//文件最大尺寸
var MAX_FILE_SIZE = 2097152;
var MAX_IMAGE_WIDTH = 2000;
var MAX_IMAGE_HEIGHT = 2000;
//判断浏览器是否支持
function getObjectURL(file){
	var url = null;
	if(window.createObjectURL != undefined){
		url = window.createObjectURL(file)
	}else if(window.URL != undefined){
		url = window.URL.createObjectURL(file)
	}else if(window.webkitURL != undefined){
		url = window.webkitURL.createObjectURL(file)
	}
	return url
}
//上传预览
//参数说明:ImageFile,input控件选择的文件;ImgLabel,img标签用于放置预览图的;
function CheckAndPreviewFile(ImageFile,ImgLabel,FrameWidth,FrameHeight,callback){
	if(ImageFile.files[0].size > MAX_FILE_SIZE){
		alert("上传文件大小不能超过2MB");
		return
	}
	var tempImage = new Image();//实例化对象
	tempImage.src = getObjectURL(ImageFile.files[0]);//获取上传文件src
	tempImage.onload = function () {//预览规则
		if(tempImage.width > MAX_IMAGE_WIDTH || tempImage.height > MAX_IMAGE_HEIGHT){
			alert("上传图片分辨率不能超过"+MAX_IMAGE_WIDTH+"*"+MAX_IMAGE_HEIGHT);
			return
		}
		var isWidthMax = tempImage.width > tempImage.height;
		var maxValue = isWidthMax ? tempImage.width : tempImage.height;
		var showWidth = tempImage.width;
		var showHeight = tempImage.height;
		if(isWidthMax){
			showWidth = FrameWidth;
			showHeight = showWidth / tempImage.width * tempImage.height;
		}else if (!isWidthMax) {
			showHeight = FrameHeight;
			showWidth = showHeight / tempImage.height * tempImage.width;
		}
		ImgLabel.css({width:showWidth,height:showHeight});
		//input：file的读取src方法
		var reader = new FileReader();
		reader.readAsDataURL(ImageFile.files[0]);
		reader.onload = function () {
			//获取上传图片路径
			ImgLabel.prop("src",reader.result)
		};
		callback(ImageFile.files[0])
	}
}

//无上传预览(URL)
//参数说明:URLObj,input:text用于获取URL路径;ImgLabel,img标签用于放置预览图的;
function CheckAndPreviewURL (URLObj,ImgLabel,FrameWidth,FrameHeight,callback) {
	var fileSrc = URLObj.val();
	//文本框不为空
	if(!/\s.+/.test(fileSrc)){
		var image = new Image();
		image.src = fileSrc;
		image.onload = function () {
			var imageWidth = image.width;
			var imageHeight = image.height;
			var len = fileSrc.length;
			//取URL的后缀
			var fileType = fileSrc.substr(fileSrc.lastIndexOf(".")+1,len).toLowerCase();
			if((fileType != "jpg") && (fileType != "png") && (fileType != "jpeg")){
				alert("文件类型不正确，请重新选择");
				return false
			} if ((imageWidth > MAX_IMAGE_WIDTH) || (imageHeight > MAX_IMAGE_HEIGHT)) {
				alert("文件大小不能超过"+MAX_IMAGE_WIDTH + "*" + MAX_IMAGE_HEIGHT);
				return false
			} if (!(fileSrc.indexOf("http://") == 0 || fileSrc.indexOf("https://") == 0)) {
                    alert("链接不正确，必须以http://或https://开头");
                    return false;
                } else {
                    //判断URL图片是否合格
                    var isWidthMax = imageWidth > imageHeight;
                    var maxValue = isWidthMax ? imageWidth : imageHeight;
                    var showWidth = imageWidth;
                    var showHeight = imageHeight;
                    //判断当前宽度是否大于外框宽度
                    if (isWidthMax) {
                        showWidth = FrameWidth;
                        showHeight = showWidth / imageWidth * imageHeight;
                    }
                    else if (!isWidthMax) {
                        showHeight = FrameHeight;
                        showWidth = showHeight / imageHeight * imageWidth;
                    }
                    $(ImgLabel).css({ width: showWidth, height: showHeight }).prop("src", image.src);
                    callback();
                }
		}
	}
}

