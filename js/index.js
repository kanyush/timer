const radioListNode = document.querySelectorAll('.holiday-label input')
const timerBtn = document.querySelector('.holidays__btn')
const daysNode = document.querySelector('#days')
const hoursNode = document.querySelector('#hours')
const minutesNode = document.querySelector('#minutes')
const secondsNode = document.querySelector('#seconds')

let selectedDate

if(!selectedDate) {
  timerBtn.disabled = true
}

radioListNode.forEach(function(radio, index) {
  radio.onchange = function() {
    const arr = radio.value.split('-')
    selectedDate = new Date(+arr[0], +arr[1] - 1, +arr[2])

    const today = new Date() // Mon 2021-06-14
    // 2018-05-27

    if(today > selectedDate) {
      if(index === 0) {
        const daysToFriday = 6 - today.getDay() - 1
        selectedDate.setFullYear(today.getFullYear())
        selectedDate.setMonth(today.getMonth())
        selectedDate.setDate(today.getDate() + daysToFriday)
      } else {
        selectedDate.setFullYear(today.getFullYear() + 1)
      }
    }

    timerBtn.disabled = false
  }
})

let intervalId

timerBtn.onclick = function() {
  renderTimer()

  clearInterval(intervalId)

  intervalId = setInterval(function() {
    renderTimer()
  }, 1000)
}

function renderTimer() {
  const time = timer(selectedDate)

  daysNode.textContent = time.days + 'д'
  hoursNode.textContent = time.hours + 'ч'
  minutesNode.textContent = time.minutes + 'м'
  secondsNode.textContent = time.seconds + 'с'
}

function timer(deadline) {
  const now = new Date()

  const diff = deadline - now

  const s = 1000
  const m = s * 60
  const h = m * 60
  const d = h * 24

  return {
    days: addZero(Math.floor(diff / d)),
    hours: addZero(Math.floor(diff % d / h)),
    minutes: addZero(Math.floor(diff % d % h / m)),
    seconds: addZero(Math.floor(diff % d % h % m / s))
  }
}

function addZero(n) {
  if(n < 10) {
    return '0' + n
  }
  return '' + n;
}
