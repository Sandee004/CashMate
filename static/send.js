var pin1= document.getElementById("pin1");
var pin2= document.getElementById("pin2");
var pin3= document.getElementById("pin3");
var pin4= document.getElementById("pin4");
const btn= document.getElementById("btn");
var a= document.getElementById("submit");

        a.originalLink= a.href

        function movetoNext(current, nextFieldID) {  
            if (current.value.length >= current.maxLength){  
            document.getElementById(nextFieldID).focus();  
            }  
        }

        btn.addEventListener("click", function() {
            if (pin4.value.length < 1){
                alert("Pin should be 4 digits!!!")
                a.href= 'javascript:void(0)';
            }
            else{
            a.href= a.originalLink;
            }
        })