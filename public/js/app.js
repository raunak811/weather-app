
console.log('client side js')

// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     console.log(res)
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading........'
    fetch('http://localhost:3000/weather?address='+location+'').then(res=>{
    res.json().then((data)=>{
        messageOne.textContent = data.forecast
        console.log(data)
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            console.log(data.location)
        }
    })
})
})



