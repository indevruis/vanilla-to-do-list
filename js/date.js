const todayDate= document.querySelector('.date');

const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    todayDate.innerHTML = (`${year}년 ${month}월 ${date}일`);
}

getDate();