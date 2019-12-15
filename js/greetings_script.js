window.count1 = 1;
window.hellos = ["Hello !","नमस्ते !","કેમ છો?","स्वागत आहे !","Hola !","Bonjour !"];

function greet()
{
    if(window.count1 >= window.hellos.length)
        window.count1= 0;
    $("#greeting").fadeOut(1000,function(){
        $("#greeting").text(window.hellos[window.count1++]+"!").fadeIn(1000);
    })
}

$(function(){
    setInterval(greet,2000);
});