data={
    name:'Neel Patel',
    detail1:'I am a final year Bachelors student in Information Technology at <a href="http://bvmengineering.ac.in/">Birla Vishvakarma Mahavidyalaya</a>. My primary interests are in Networking and Security, Backend Development and a little bit in Machine Learning.',
    detail2:'I am currently working as an "Intern-Product and Project" at <a href="http://www.theopeneyes.com/">OpenEyes Technologies, Inc</a> for a period of 4 months. At OpenEyes, I am working with a team-mate to develop a ML based project named <a href="https://github.com/neelpatel05/anti-smokify">"Anti-Smokify"</a> to identify smoking scenes from videos and movies. For our project, we are using <span>Flask</span>, <span>Python</span>, <span>AWS</span> for Backend and <span>ResNet50</span>, <span>Yolo3</span> models for Transfer Learning to predict the frames.'
}

window.onload = function(){
    scramble1()
}

function scramble1(){
    var x = 0;
    var name = document.getElementById("name").textContent
    var detail1 = document.getElementById("detail1").textContent
    var detail2 = document.getElementById("detail2").textContent
    var intervalID=setInterval(function () {
        document.getElementById("name").innerHTML = scramble(name)
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
