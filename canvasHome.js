const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Gradient{
  constructor(r,g,b){
    this.r = r
    this.g = g
    this.b = b
  }
}

class Pop_Words {
  constructor(ltr, x, y, opac, size, doResize){
      this.ltr = ltr
      this.x = x
      this.y = y
      this.opac = opac

      this.size = size

      this.doResize = doResize
      this.drawn = false

      this.mouseX = 0
      this.mouseY = 0

      this.day = false


  }

  draw(){
    //&& this.opacDelay >= 0
    if(this.day == false){
      c.fillStyle = "black";
    }else {c.fillStyle = "white";}

    if(cycleAry[0].frames == 550){
      this.day = !this.day
    }






    if(this.opac < 1){
      this.opac += 0.2
    }
    if(this.opac >= 1 && this.drawn == false){
      this.doResize = false
      this.drawn = true
    }


    c.globalAlpha = this.opac;

    c.font = this.size+'px Bungee'

    if(this.drawn == false && this.opac < 0.5){
      this.size += 4
    }
    if(this.drawn == false && this.opac >= 0.5){
      this.size -= 4
    }

    if(this.mouseX >= this.x &&
      this.mouseX <= this.x+20 &&

      this.mouseY >= this.y-20 &&
      this.mouseY <= this.y &&

      this.drawn == true &&
      this.size < 40){

      this.size +=10
    }


    if(
      (this.mouseX < this.x ||
      this.mouseX > this.x+20) &&

      /*
      (this.mouseY < this.y-20 ||
      this.mouseY > this.y) &&*/

      this.drawn == true &&
      this.size > 30){
      this.size -=2
    }

    /*if(this.size >= 32){
      this.size -=2
    }*/
    if(this.size >=40){
      c.fillStyle = "red";
    }
    c.fillText(this.ltr, this.x, this.y)
    c.fillStyle = "black";
  }
  update(){


    if(this.doResize == true || this.drawn == true){
      this.draw()
    }

  }

}

class Fade_Words {
  constructor(ltr, x, y, opac, size, drawn){
    this.ltr = ltr
    this.x = x
    this.y = y
    this.opac = opac
    this.size = size
    this.drawn = drawn
  }

  draw(){

    if(this.opac < 1 && this.drawn == false){
      this.opac += 0.03
    }
    if(this.opac >= 1 && this.drawn == false){
      this.drawn = true
    }
    c.globalAlpha =  this.opac
    c.font = this.size+'px Bungee'
    c.fillText(this.ltr, this.x, this.y, 500)

  }

  update(){
    this.draw()
  }

}

class Cycle {
  constructor(radius, newArc, prevArc, onCycle, onTop){
    this.radius = radius

    this.newArc = newArc
    this.prevArc = prevArc

    this.onTop = onTop

    this.pause = false
    this.frames = 0
    this.timer = 0

    this.opacity = 0
    this.day = true

    this.originalCycle = onCycle
    this.tracker = 180
    this.onCycle = onCycle
    this.transition = false

  }
  draw(){
    c.beginPath()
    c.globalAlpha = this.opacity
    if(this.opacity < 1){
      this.opacity += 0.05
    }

    //newArc starts at pi for the top half
    //bottom half starts at 2pi
    c.arc(innerWidth/2-100, innerHeight/2+290, this.radius, this.prevArc, this.newArc , false)




    let gradient = c.createLinearGradient(0, 300, 0, 0)
    if(this.onCycle == 1){
      gradient.addColorStop(0, `rgb(${dayAry[0].r},${dayAry[0].g},${dayAry[0].b})`);
      gradient.addColorStop(0.24, `rgb(${dayAry[1].r},${dayAry[1].g},${dayAry[1].b})`);
      gradient.addColorStop(0.42, `rgb(${dayAry[2].r},${dayAry[2].g},${dayAry[2].b})`);
      gradient.addColorStop(1, `rgb(${dayAry[3].r},${dayAry[3].g},${dayAry[3].b})`);
    }
    if(this.onCycle == 2 && this.onTop == false){ this.onCycle = 1 }
    if(this.onCycle == 2 && this.onTop == true){
      if(this.transition == false){
        this.transition = true
        this.tracker = 1

      }

      gradient.addColorStop(0, `rgb(${(dayAry[0].r-nightAry[0].r)/-180 * this.tracker + dayAry[0].r},
                                    ${(dayAry[0].g-nightAry[0].g)/-180 * this.tracker + dayAry[0].g},
                                    ${(dayAry[0].b-nightAry[0].b)/-180 * this.tracker + dayAry[0].b})`);

      gradient.addColorStop(0.24, `rgb(${(dayAry[1].r-nightAry[1].r)/-180 * this.tracker + dayAry[1].r},
                                       ${(dayAry[1].g-nightAry[1].g)/-180 * this.tracker + dayAry[1].g},
                                       ${(dayAry[1].b-nightAry[1].b)/-180 * this.tracker + dayAry[1].b})`);

      gradient.addColorStop(0.42, `rgb(${(dayAry[2].r-nightAry[2].r)/-180 * this.tracker + dayAry[2].r},
                                       ${(dayAry[2].g-nightAry[2].g)/-180 * this.tracker + dayAry[2].g},
                                       ${(dayAry[2].b-nightAry[2].b)/-180 * this.tracker + dayAry[2].b})`);

      gradient.addColorStop(1, `rgb(${(dayAry[3].r-nightAry[3].r)/-180 * this.tracker + dayAry[3].r},
                                    ${(dayAry[3].g-nightAry[3].g)/-180 * this.tracker + dayAry[3].g},
                                    ${(dayAry[3].b-nightAry[3].b)/-180 * this.tracker + dayAry[3].b})`);
      if(this.tracker <= 180 && this.frames > 500){
        this.tracker += 1

      }



    }

    if(this.onCycle == 3){
      gradient.addColorStop(0, `rgb(${nightAry[0].r},${nightAry[0].g},${nightAry[0].b})`);
      gradient.addColorStop(0.24, `rgb(${nightAry[1].r},${nightAry[1].g},${nightAry[1].b})`);
      gradient.addColorStop(0.42, `rgb(${nightAry[2].r},${nightAry[2].g},${nightAry[2].b})`);
      gradient.addColorStop(1, `rgb(${nightAry[3].r},${nightAry[3].g},${nightAry[3].b})`);
    }
    if(this.onCycle == 4 && this.onTop == false){ this.onCycle = 3 }
    if(this.onCycle == 4 && this.onTop == true){
      if(this.transition == false){

        this.transition = true
        this.tracker = 1
      }

      gradient.addColorStop(0, `rgb(${(nightAry[0].r-dayAry[0].r)/-180 * this.tracker + nightAry[0].r},
                                    ${(nightAry[0].g-dayAry[0].g)/-180 * this.tracker + nightAry[0].g},
                                    ${(nightAry[0].b-dayAry[0].b)/-180 * this.tracker + nightAry[0].b})`);

      gradient.addColorStop(0.24, `rgb(${(nightAry[1].r-dayAry[1].r)/-180 * this.tracker + nightAry[1].r},
                                       ${(nightAry[1].g-dayAry[1].g)/-180 * this.tracker + nightAry[1].g},
                                       ${(nightAry[1].b-dayAry[1].b)/-180 * this.tracker + nightAry[1].b})`);

      gradient.addColorStop(0.42, `rgb(${(nightAry[2].r-dayAry[2].r)/-180 * this.tracker + nightAry[2].r},
                                       ${(nightAry[2].g-dayAry[2].g)/-180 * this.tracker + nightAry[2].g},
                                       ${(nightAry[2].b-dayAry[2].b)/-180 * this.tracker + nightAry[2].b})`);

      gradient.addColorStop(1, `rgb(${(nightAry[3].r-dayAry[3].r)/-180 * this.tracker + nightAry[3].r},
                                    ${(nightAry[3].g-dayAry[3].g)/-180 * this.tracker + nightAry[3].g},
                                    ${(nightAry[3].b-dayAry[3].b)/-180 * this.tracker + nightAry[3].b})`);
      if(this.tracker <= 180 && this.frames > 500){
        this.tracker += 1

      }



    }

    c.fillStyle = gradient

    c.fill()
    c.closePath()

    if(this.frames > 500){
      if(this.frames == 501){
        this.onCycle += 1
      }
      if(this.newArc > Math.PI * 2){
        this.newArc = 0
        this.prevArc = Math.PI
      }
      if(this.prevArc > Math.PI * 2){
        this.prevArc = 0
        this.newArc = Math.PI
      }
      this.newArc += 0.01745
      this.prevArc += 0.01745

      this.timer += 1
      if(this.timer >= 180){
        this.day = !this.day
        this.onTop = !this.onTop
        this.onCycle = this.originalCycle
        this.transition = false

        if(this.newArc >= Math.PI / 2 && this.newArc < Math.PI * 1.75){
          this.newArc = Math.PI
          this.prevArc = 0
        }
        if((this.newArc >= Math.PI * 1.75 && this.newArc <= Math.PI * 2.5) || this.newArc < Math.PI / 2){
          this.newArc = 0
          this.prevArc = Math.PI
        }

        this.frames = 0
        this.timer = 0
      }
    }

    this.frames +=1




    c.fillStyle = "black"
  }
  update(){
    this.draw()

  }
}
//

class Stars{
  constructor(x,y,color, radians, pivotX, pivotY){
    this.x = x
    this.y = y
    this.color = color
    this.radians = radians
    this.pivotX = pivotX
    this.pivotY = pivotY

    this.trailX = [this.x, this.x, this.x, this.x, this.x]
    this.trailY = [this.y, this.y, this.y, this.y, this.y]

    this.trailSubX = []
    this.trailSubY = []

    this.colorSet = ["153, 255, 255","0, 0, 255","84, 90, 167","70, 143, 234","255, 149, 41", "253, 204, 13"]
    this.uniqueSpeed = Math.random()
    this.uniqueColor = this.colorSet[Math.floor(Math.random()*this.colorSet.length)]

  }
  draw(){

    for(let i=0; i<this.trailX.length -1; i++){
      this.trailSubX[i]=this.trailX[i]
      this.trailSubY[i]=this.trailY[i]
    }

    for(let i=1; i<this.trailX.length; i++){
      this.trailX[i] = this.trailSubX[i-1]
      this.trailY[i] = this.trailSubY[i-1]
    }
    this.trailX[0] = this.x
    this.trailY[0] = this.y



    for(let i=1; i<this.trailX.length; i++){

      let ratio = (this.trailX.length - i ) / this.trailX.length;
      c.beginPath()
      c.moveTo(this.trailX[i-1], this.trailY[i-1])
      c.lineTo(this.trailX[i], this.trailY[i])
      c.strokeStyle = `rgba(${this.uniqueColor},${ratio})`
      c.lineWidth = 13;
      c.stroke()
      c.closePath()



    }


    c.beginPath()
    c.arc(this.trailX[0], this.trailY[0], 7, 0, Math.PI*2, false)
    c.fillStyle = `rgba(${this.uniqueColor}, 0.7)`
    c.shadowColor = `rgba(${this.uniqueColor})`
    c.shadowBlur = 10
    c.fill()
    c.shadowBlur = 0
    c.closePath()

    /**
    c.moveTo(this.x, this.y);
    c.lineTo(this.pivotX, this.pivotY);
    c.stroke();

    c.beginPath()
    c.arc(this.pivotX, this.pivotY, 5, 0, Math.PI*2, false)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
    **/
    var xSub = this.x - this.pivotX
    var ySub = this.y - this.pivotY

    this.radians = 0.01745 * (2 * this.uniqueSpeed)

    var xSub2 = xSub * Math.cos(this.radians) - Math.sin(this.radians) * ySub
    var ySub2 = xSub * Math.sin(this.radians) + Math.cos(this.radians) * ySub

    this.x = xSub2 + this.pivotX
    this.y = ySub2 + this.pivotY
    //this.x = this.x + Math.cos(this.radians) * 10
    //this.y = this.y + Math.sin(this.radians) * 10



    c.fillStyle = 'black'
  }



  update(){
    this.draw()
  }
}

var sentenceAry = []
var words = "Hi,I'm Zydric,web developer"

var sub = 0


let starAry



function setup(){
  for(var i=0; i<words.length; i++){

    if(i==0){
      sentenceAry.push(new Pop_Words(words.charAt(i), i*10, 0, 0, 30, true))
    }else{
      if(i < 3){
        if(i == 2){
          sentenceAry.push(new Pop_Words(words.charAt(i), i*19, 0, 0, 30, false))
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), i*20, 0, 0, 30, false))
        }
      }

      if(i >= 3 && i < 14){
        if(i == 4){
          sentenceAry.push(new Pop_Words(words.charAt(i), sub-5, 50, 0, 30, false))
        }else{
          if(i == 5){
            sentenceAry.push(new Pop_Words(words.charAt(i), sub+3, 50, 0, 30, false))
            sub += 20
          }else{
            if(i == 12){
              sentenceAry.push(new Pop_Words(words.charAt(i), sub-3, 50, 0, 30, false))
              sub += 15
            }else{
              sentenceAry.push(new Pop_Words(words.charAt(i), sub, 50, 0, 30, false))
              sub += 20
            }
          }
        }
      }

      if(i >= 14){
        if(sub > 0 && i == 14){
          sub = 0
        }
        if(i == 15){
          sentenceAry.push(new Pop_Words(words.charAt(i), sub+3, 100, 0, 30, false))
          sub += 21
        }else{
          sentenceAry.push(new Pop_Words(words.charAt(i), sub, 100, 0, 30, false))
          sub += 20
        }
      }
    }
  }
  cycleAry = []
  cycleAry.push(new Cycle(1500, Math.PI, 0, 3, false))
  cycleAry.push(new Cycle(1500, 0, Math.PI, 1, true))

  //starAry.push(new Cycle(1500,'yellow',0,Math.PI))

  starAry = []
  for(var i=0; i<100; i++){
    let bigR = 1
    let phi = Math.random() * Math.PI
    let smallR = Math.sqrt(Math.random()) * bigR
    let genX = smallR * Math.cos(phi)
    let genY = smallR * Math.sin(phi)
    starAry.push(new Stars(genX * innerWidth, genY * innerHeight + 900, 'green', 0, innerWidth/2-100, innerHeight/2+290))
  }

  duskAry = []
  duskAry.push(new Gradient(253, 125, 0))
  duskAry.push(new Gradient(8, 109, 161))
  duskAry.push(new Gradient(8, 109, 161))
  duskAry.push(new Gradient(5, 54, 160))

  dayAry = []
  dayAry.push(new Gradient(96, 213, 255))
  dayAry.push(new Gradient(78, 208, 255))
  dayAry.push(new Gradient(40, 202, 250))
  dayAry.push(new Gradient(0, 187, 255))

  dawnAry = []
  dawnAry.push(new Gradient(255, 255, 255))
  dawnAry.push(new Gradient(37, 127, 215))
  dawnAry.push(new Gradient(0, 63, 160))
  dawnAry.push(new Gradient(0, 18, 140))

  nightAry = []
  nightAry.push(new Gradient(0, 12, 25))
  nightAry.push(new Gradient(0, 0, 0))
  nightAry.push(new Gradient(0, 0, 0))
  nightAry.push(new Gradient(0, 0, 0))

}

setup()

var desc = "Megamind was a great movie"
var description = new Fade_Words(desc, 0, 150, 0, 15, false)

var currentLtr = 0
//words.charAt()
var active = true

//
let mousex, mousey
c.canvas.addEventListener('mousemove', function(event){
   mousex = event.clientX - c.canvas.offsetLeft - 100,
   mousey = event.clientY - c.canvas.offsetTop - 100

   //document.getElementById('status').innerHTML = mousex +" | "+ mousey
})


function animate(){
  requestAnimationFrame(animate)
  c.clearRect(0,0, innerWidth, innerHeight)

  c.save()
  c.translate(100,100)

  if(sentenceAry[sentenceAry.length-1].drawn == true){
    for(var i=0; i<cycleAry.length; i++){
      cycleAry[i].update()
      if(i==0){
        starAry.forEach((stars)=>{
          stars.update()
        })
      }
    }


  }
  for(var i=0; i<sentenceAry.length; i++){
    sentenceAry[i].mouseX = mousex
    sentenceAry[i].mouseY = mousey

    if(sentenceAry[i].doResize == false && currentLtr == i){
      currentLtr = i+1
      if(currentLtr < sentenceAry.length){
        sentenceAry[currentLtr].doResize = true
      }
    }
    sentenceAry[i].update()
  }

  if(sentenceAry[sentenceAry.length-1].drawn == true){
    description.update()
  }



  c.restore()

}


animate()
