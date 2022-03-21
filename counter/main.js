const numsArr = document.querySelectorAll('.num')

let step = 220;

numsArr.forEach(item => {
    const countTo = +item.getAttribute('countTo');
    const increaseBy = Math.trunc(countTo / step);
    console.log(increaseBy);
    const updateNum = setInterval(() => {
        console.log('logging')
        const currNum = +item.textContent;
        currNum < countTo ? item.innerHTML = Math.trunc(currNum + increaseBy) : clearInterval(updateNum);   
    }, 1);  
})