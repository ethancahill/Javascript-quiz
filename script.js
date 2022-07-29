var startBtn = document.getElementById('startbtn')
var time = 90
function start() {
  var timer =  setInterval(function(){
        time = time - 1
        if(time <= 0){
            clearInterval()
        } else {

        }
    })
}

startBtn.addEventListener('click', start)