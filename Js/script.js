window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    hideTabContent(1);

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })
    

    //Timer

    let deadline = '2021-09-05';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / 1000 / 60 / 60); 

            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(apdateClock, 1000);

        function apdateClock() {
            let t = getTimeRemaining(endtime);
            if (t.hours < 10) hours.textContent = '0' + t.hours;
            if (t.hours >= 10) hours.textContent = t.hours;
            if (t.minutes < 10) minutes.textContent = '0' + t.minutes;
            if (t.minutes >= 10) minutes.textContent = t.minutes;
            if (t.seconds < 10) seconds.textContent = '0' + t.seconds;
            if (t.seconds >= 10) seconds.textContent = t.seconds;

            if(t.total <= 0) {
                clearInterval(timeInterval);
                seconds.textContent = '00';
                minutes.textContent = '00';
                hours.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descBtn = document.querySelectorAll('.description-btn');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    })

    
   
    descBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    })

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })
    
    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        inp = contactForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);
        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        })
        let json = JSON.stringify(obj);

        function postFormData(data) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                //request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
                request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        resolve()
                    } else if (request.readyState == 4 && request.status == 200) {
                        resolve()
                    } else {
                        reject()
                    }
                });
                request.send(data);
            })
        }

        function cleanInputs() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postFormData(json)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(cleanInputs)
        
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);
        
        let contactObject = {
            'email': inp[0].value,
            'phone': inp[1].value
        };
        let contactJson = JSON.stringify(contactObject);

        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8');
                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        resolve()
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve()
                    } else {
                        reject()
                    }
                });
                
                request.send(data);
            })
        }

        function cleanInput() {
            for (let i = 0; i < inp.length; i++) {
                inp[i].value = '';
            }
        }

        postData(contactJson)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(cleanInput)

    })

});


