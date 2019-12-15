window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
        } catch (error) {
            console.log('error');
        }
    }
});

window.onload = function(){
    browser()
    console.log("Hey there developer!")
}

function browser(){
    if(navigator.userAgent.indexOf("Chrome") != -1 ){
        document.getElementById("profileimg").src = "../files/neel.webp";
        document.getElementById("chai").src = "../files/chai.webp";
    }
    else if(navigator.userAgent.indexOf("Safari") != -1){
        document.getElementById("profileimg").src = "../files/neel-png.png";
        document.getElementById("chai").src = "../files/chai-png.png";
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
      document.getElementById("profileimg").src = "../files/neel.webp";
        document.getElementById("chai").src = "../files/chai.webp";
    }
}
