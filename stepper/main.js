
const btns = document.querySelector('.btns')
const line = document.querySelectorAll('.line')
const rootItems = document.documentElement.style;
const steps = document.querySelectorAll('.step')
// console.log(rootItems);
let step = 1;



const stepTo = function () {
    // Used Event Delegation
    btns.addEventListener('click', (e) => {

        if(e.target.classList.contains('next') && step < 5){
            // console.log(e.target.classList)
            rootItems.setProperty(`--line-width-${step}`, '100%');
            steps[step].style.borderColor = "#3891d8";
            step += 1;
            if(step === 2){
                btns.children[0].style.backgroundColor = "#3891d8";
            }
            if (step === 5){
                btns.children[1].style.backgroundColor = "#dcdadc";
            }
        }
        else if(e.target.classList.contains('prev') && step > 1){
            step -= 1;
            // console.log(rootItems)
            rootItems.setProperty(`--line-width-${step}`, '0%');
            steps[step].style.borderColor = "#dcdadc";
            if (step === 1){
                btns.children[0].style.backgroundColor = "#dcdadc";
            }
            if ( step === 4){
                btns.children[1].style.backgroundColor = "#3891d8";
            }
        }
    })
}

stepTo();