function onloadCertList() {
	//OnLoad();
	var DNs = getCerts();
	if(DNs!==false){
		var option=document.getElementById("certlist").options;
		option.length = 0;
		for (var i = 0; i < DNs.length; i++) {
			option.add(new Option(DNs[i], DNs[i]));
		}
	}
};

function signCert(){
	var strMessage = String(new Date().getTime()),strDN=document.getElementById("certlist").value
	,c = document.getElementById("CryptoAgency1");
	try {
		c.AddCertBySubjectDN(strDN);
        var cert = c.GetCertContent();
        var strRet = c.SignData(strMessage);
		//ǩ�����
		document.getElementById("strRet").value = strRet;
        document.getElementById("certificate").value = cert;
        //document.getElementsByTagName("form")[0].submit();
	}
	catch(e){
		alert(c?c.GetLastErrorDesc():e.message);
		return false;
	}
};

function getCerts(){
	try {
	    var c=document.getElementById("CryptoAgency1");
	    if(c&&(typeof c.GetCertSubjectDNs != 'undefined')){
	    	var DNs=c.GetCertSubjectDNs("CFCA");
	    	return DNs?DNs.split("||"):false;
	    }
	    return false;
    }catch(e){
    	alert((c?c.GetLastErrorDesc():"")+" "+e.message);
    	return false;
    }
};

// ��ʾ������ʾ added by cfj
function displayAddr(){	
	var span_1=document.getElementById("span_1");  
	//var span_2=document.getElementById("span_submit");
	if(checkCab()==false){
		//span_2.style.display='none';
		//span_1.innerHTML='<a href="#" class="p4" onclick="downLoad()">������Ӱ�װ�ؼ�,��װ��Ϻ���ˢ�µ�ǰҳ��</a>';
		span_1.innerHTML='<input type="button" value="������Ӱ�װ�ؼ�,��װ��Ϻ������������" onclick="downLoad()"/>';
		//span_2.innerHTML='<a href="#" class="p4" onclick="onLoad()">ˢ��ҳ��</a>';
	}else{
		span_1.innerHTML='���������֤�飬�����"��һ��"';		
	}
}

// ����Ƿ�װ�˿ؼ�  added by cfj
function checkCab() {
    try 
    {
		var c=document.getElementById("CryptoAgency1");
		
		var LastErrorDesc = c.GetLastErrorDesc();  //���ÿؼ���һ�����ú���
		if(LastErrorDesc!="undefined"){				//����ú������óɹ�
			return true;
		}
		else{										//����ú�������ʧ��
			return false;
		}
		
    }
    catch (e)
    {    	 
    	 return false;
    }
}

function downLoad() {
    try {
    	if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
            if (window.navigator.cpuClass == "x86") {
            	location.href=_BASEPATH_+'download/CryptoKit.PBC.CRC.x86.exe';
            }
        }
        else {
            location.href=_BASEPATH_+'download/npCryptoKit.PBC.CRC.x86.exe';
        }    	
    }
    catch (e) {
        alert("�ؼ�����ʧ��");
        return;
    }
}

var OnLoad = (function(){
	var str,ua = navigator.userAgent.toLowerCase(),
	    check = function(r){return r.test(ua);},
	    isOpera = check(/opera/),isIE = !isOpera && isIEBrowser();
	if(isIE){
		str = '<object id="CryptoAgency1" codeBase="'+_BASEPATH_+'download/CryptoKit.PBC.CRC.x86.cab#version=3,4,0,2" classid="clsid:F7AACEAA-BE9D-4ECD-8A19-067765E4387C"></object>';
	}else{
		str = '<embed id="CryptoAgency1" type="application/npCryptoKit.PBC.CRC.x86" style="height: 0px; width:0px"></embed>';
	}
	return function(){
		return str;
	};
})();

function isIEBrowser(){
	var ua = navigator.userAgent;
	if(ua.indexOf("MSIE") > -1 || (ua.toLowerCase().indexOf("trident") > -1 && ua.indexOf("rv") > -1 )){
		return true;
	}else{
		return false;
	}
}