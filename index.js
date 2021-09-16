const form = document.querySelector("form");
const btnStart = document.querySelector(".btn__start");
const noticeTime = document.querySelector(".notice__column--time");
const noticeScore= document.querySelector(".notice__column--score");

form.addEventListener("click", (e)=>{
    e.preventDefault();
})

const generateNumber = (second) => {
    return Math.trunc(Math.random() * second) + 1 ;
};


//Display mole anc catch mole
let score = localStorage.getItem("currentScore") ? localStorage.getItem("currentScore") : 0;
noticeScore.textContent = `점수 : ${score}`;


let arrMoles =[];
const showMole = () => {
    const randomSecond = generateNumber(3);
    const molBoxDivs = document.querySelectorAll(".mole__box div");
    molBoxDivs.forEach((m,i)=>{
        m.setAttribute("data-num" , i + 1);
    })
   
     setTimeout(()=>{
        molBoxDivs.forEach((molBoxDiv)=>{
            const randomMole = generateNumber(24);
            if(parseInt(molBoxDiv.getAttribute("data-num")) === randomMole && arrMoles.length<5) {
                arrMoles.push(randomMole)
                molBoxDiv.textContent="+_+";
                molBoxDiv.style.backgroundColor="#fbc531";
                console.log(arrMoles);

                molBoxDiv.addEventListener("click", () => {
                    arrMoles.pop();
                    molBoxDiv.textContent="X";
                    molBoxDiv.style.backgroundColor="#fff";
                    score++;
                    localStorage.setItem("currentScore", score);
                    noticeScore.textContent = `점수 : ${score}`;
                  
                })
            }
        })
    }, randomSecond);
    
};



//Game trigger
let second =  localStorage.getItem("timeRemaining") ? localStorage.getItem("timeRemaining") : 60;
noticeTime.textContent = `시간 : ${second}`; 

const gameTrigger = () => {
    if(second==0){
        return;
    }
    second--;
    noticeTime.textContent = `시간 : ${second}`;
    const timeoutId = setInterval(()=>{
        if(second <= 0){
            clearInterval(timeoutId);
            localStorage.clear();
            let molesMap = document.querySelector(".mole__container"),
                cloneMolesMap = molesMap.cloneNode(true);
            molesMap.parentNode.replaceChild(cloneMolesMap, molesMap);
        }else {
            showMole();
            second --;
            localStorage.setItem("timeRemaining", second);
            noticeTime.textContent = `시간 : ${second}`;
        }
    }, 1000);
   
};

btnStart.addEventListener("click", gameTrigger);




