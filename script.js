var startBtn = document.getElementById('startbtn')
var time = 90
function start() {
    setInterval(function(){
        time = time - 1
    })
}

startBtn.addEventListener('click', start)