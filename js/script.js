data={
    name:'Neel Patel',
    email:'neel.patel6573@gmail.com',
    detail1:'I am a final year Bachelors student in Information Technology at <a href="http://bvmengineering.ac.in/">Birla Vishvakarma Mahavidyalaya</a>. My primary interests are in Networking and Security, Backend Engineering and some what in Machine Learning.',
    detail2:'I was working as an "Intern-Product and Project" at <a href="http://www.theopeneyes.com/">OpenEyes Technologies, Inc</a> from Jan 2019 - April 2019. At OpenEyes, I was working with a team-mate to develop a ML based project named <a href="https://github.com/neelpatel05/anti-smokify">"Anti-Smokify"</a> to identify smoking scenes from videos and movies. For our project, we were using <span>Flask</span>, <span>Python</span>, <span>MongoDB</span> for Backend and <span>ResNet50</span>, <span>dlib</span> to predict the frames.'
}

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
    scramble1()
}

function scramble1(){
    var x = 0;
    var name = document.getElementById("name").textContent
    var email = document.getElementById("email").textContent
    var detail1 = document.getElementById("detail1").textContent
    var detail2 = document.getElementById("detail2").textContent
    var intervalID=setInterval(function () {
        document.getElementById("name").innerHTML = scramble(name)
        document.getElementById("email").innerHTML = scramble(email)
        document.getElementById("detail1").innerHTML = scramble(detail1)
        document.getElementById("detail2").innerHTML = scramble(detail2)
        if (++x === 20) {
            window.clearInterval(intervalID);
            document.getElementById("name").innerHTML = data.name
            document.getElementById("detail1").innerHTML = data.detail1
            document.getElementById("detail2").innerHTML = data.detail2
        }
    }, 75);
}

function unscrambleEmail(){
    var x = 0;
    var email = document.getElementById("email").textContent
    var intervalID=setInterval(function () {
        document.getElementById("email").innerHTML = scramble(email)
        if (++x === 20) {
            window.clearInterval(intervalID);
            document.getElementById("email").innerHTML = data.email
        }
    }, 100);
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