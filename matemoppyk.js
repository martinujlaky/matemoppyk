var canvas = document.getElementById('cvs1');
canvas.width = 900;
canvas.height = 500;
let score = 0;
let celkovobezine = 0;
let zvysenie=2;
let total = "";
let zacate = 10;
let stlacene=0;
let priklad = 0;
let ctx = canvas.getContext("2d");
ctx.font = '20pt Calibri';
let maxnum=0;
let vysledok = 0;
let bckg = new Image();
bckg.src = "podklad.png";
let pipo = new Image();
pipo.src = "pipto.png";
let prva = new Image();
prva.src = "prva.png";
let druha = new Image();
druha.src = "druha.png";
let treta = new Image();
treta.src = "treta.png";
let stvrt = new Image();
stvrt.src = "stvrt.png";
let x=0;
let y=0;
let maxrad = 0;

function generujPriklad()
{
  let kolkovrade = Math.floor(Math.random()*(maxrad+1));
  let cislo;
  let predosle=-1;

  if (kolkovrade==1)
    kolkovrade=2;

  for (let i =0; i<kolkovrade; i++)
  {
     if ( predosle < 0 )
     { 
       cislo = Math.floor(Math.random()*(maxnum+1));
       
       priklad = cislo;
       vysledok = 0+cislo;
     }
     else
     {
        if  ( Math.random() < 0.5 )
        {
            cislo = Math.floor(Math.random()*(maxnum-vysledok+1)); 
            
            priklad = priklad + "+" + cislo;
            vysledok = vysledok+cislo;  
        }
        else
        {
           cislo = Math.floor(Math.random()*(vysledok+1));
           priklad = priklad + "-" + cislo;
           vysledok = vysledok-cislo;
        }
     }
     predosle = cislo;  
  } 

}

function refresk ()
{    
    if ( stlacene < 0) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    if ( maxnum === 0 ) 
    {
        ctx.fillStyle="BLUE";
        ctx.font = '20pt Calibri';
        ctx.fillText("Do kolko maximalne pocitame (zadaj cislo)", 200,100);
        if (total != "")
        {
           ctx.fillStyle="RED";
           ctx.font = '30pt Calibri';
           ctx.fillText(total, 400,200);
        }
        return;
    }
    else if ( maxrad === 0 )
    {
        ctx.fillStyle="BLUE";
        ctx.font = '20pt Calibri';
        ctx.fillText("Maximalne dlhy rad cisel (zadaj cislo)", 200,100);
        if (total != "")
        {
           ctx.fillStyle="RED";
           ctx.font = '30pt Calibri';
           ctx.fillText(total, 400,200);
        }
        return;
    }

    ctx.drawImage(bckg, 0,0,900,500);

    if (zacate>9)
    {
      if (zacate < 15)
      {   
        x=100+(zacate*3);
        y=300+(zacate*5);
      }
      else 
      {
        x=120+zacate;
        y=440;
      }
    }  
    
    if ( (zacate < -25 || zacate > 9) && zacate < 500 )
      ctx.drawImage(pipo, x,y,100,50);

    if (zacate<-40)
    {
        ctx.drawImage(prva, x, 480,100,100);
    }
    if (zacate<-35 && zacate>=-40)
    {
        ctx.drawImage(druha, x, 470,100,100);
    }
    if (zacate<-30 && zacate>=-35)
    {
        ctx.drawImage(treta, x, 460,100,100);
    }
    if (zacate<-25 && zacate>=-30)
    {
        ctx.drawImage(stvrt, x, 460,100,100);
    }
    if (zacate<-20 && zacate>=-25)
    {
        ctx.drawImage(treta, x, 460,100,100);
    }
    if (zacate<-15 && zacate>=-20)
    {
        ctx.drawImage(druha, x, 470,100,100);
    }
    if (zacate<-10 && zacate>=-15)
    {
        ctx.drawImage(prva, x, 480,100,100);
    }

    if (zacate > 500)
    {
       ctx.fillStyle="RED";
       ctx.font = '30pt Calibri';
       ctx.fillText("MOPPY UTIEKOL DO GARAZE. KONIEC!", 200,200);
       clearInterval(intors); 
    }
  
    if (zacate > 15 && zacate < 500)
    {
      ctx.fillStyle="BLUE";
      ctx.font = '20pt Calibri';
      ctx.fillText(priklad, 130+zacate,430);
    }

    ctx.fillStyle="GREEN";
    ctx.font = '30pt Calibri';
    ctx.fillText("BODY: " + score, 500,50);

    if (total != "")
    {
      ctx.fillStyle="RED";
      ctx.font = '30pt Calibri';
      ctx.fillText(total, 400,200);
    }
    zacate=zacate+zvysenie;

    if ( celkovobezine > 500 )
    {
      celkovobezine=0;
      zvysenie=zvysenie+0.5;
    }

    celkovobezine=celkovobezine+1;
}

document.onkeyup = checkKey;


function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '49' || e.keyCode == '97') {    
        total=total+"1";
    }
    else if (e.keyCode == '50' || e.keyCode == '98') { 
        total=total+"2";
    }
    else if (e.keyCode == '51' || e.keyCode == '99') {  
        total=total+"3";
    }
    else if (e.keyCode == '52' || e.keyCode == '100') {  
        total=total+"4";
    }
    else if (e.keyCode == '53' || e.keyCode == '101') {  
        total=total+"5";
    }
    else if (e.keyCode == '54' || e.keyCode == '102') {  
        total=total+"6";
    }
    else if (e.keyCode == '55' || e.keyCode == '103') {  
        total=total+"7";
    }
    else if (e.keyCode == '56' || e.keyCode == '104') {  
        total=total+"8";
    }
    else if (e.keyCode == '57' || e.keyCode == '105') {  
        total=total+"9";
    }
    else if (e.keyCode == '48' || e.keyCode == '96') {  
        total=total+"0";
    }
    else if (e.keyCode == '13') {  // enter  
      if (maxnum === 0)
      {
        maxnum=parseInt(total);
        total="";
      }
      else if ( maxrad === 0 )
      {
        maxrad=parseInt(total);
        total="";
        generujPriklad();
      }  
      else
      {
        if ( parseInt(total) === vysledok ) {
          generujPriklad();
          score = score+(500-zacate);
          zacate=-50;
        }
        total="";
      }  
    }
    else if (e.keyCode == '80') {  // enter  
        stlacene=-1;
    } 
}

intors = setInterval( refresk, 50 );
