let throttle = require('lodash.throttle');

const FORM_TEXT_DATA = "feedback-form-state"

const formEL = document.querySelector('.feedback-form')
const textareaEl = document.querySelector('.feedback-form textarea')
const inputEl = document.querySelector('.feedback-form input')



const formData = {}


formEL.addEventListener('input', throttle(keyboardTextListener, 500))
formEL.addEventListener('submit', submitForm)


saveText()

function saveText () {
    const textareaInput = loadLocalStorage(FORM_TEXT_DATA)

    if (textareaInput) {
            textareaEl.value = textareaInput.text ?? ''
            inputEl.value = textareaInput.email ?? ''

            formData.text = textareaInput.text
            formData.email = textareaInput.email

    }
}



function keyboardTextListener ({target}) {
 
    if (target.nodeName === 'INPUT') {
        formData.email = target.value.trim()
    }

    if (target.nodeName === 'TEXTAREA') {
        formData.text = target.value.trim()
    }

    saveLocalStorage(FORM_TEXT_DATA, formData)
}

function submitForm (evt) {
    evt.preventDefault()
    if (inputEl.value !== '' && textareaEl.value !== '') {
        console.log(formData)
        localStorage.removeItem(FORM_TEXT_DATA)
        evt.target.reset()
    }
}

function saveLocalStorage (key ,value) {
        try {
            const  serializeState = JSON.stringify(value);
            localStorage.setItem(key, serializeState);
        } catch (error) {
            console.error('Sat state error', error.message);
        }
}

function loadLocalStorage (key) {
    try {
        const serializeState = localStorage.getItem(key)
        return serializeState === null ? undefined : JSON.parse(serializeState)
    }   catch (error) {
        console.error('Get state error', error.message)
    }
}

