const filterCardUsers = () => {
  const selectRole = document.getElementById('select-role-user')
  const cardUsersRole = document.getElementsByName('role')
  const cardUsers = document.getElementsByName('card-user')

  if (selectRole.value === 'todos') {

    if (cardUsers.length > 0) {
      cardUsers.forEach(cardUser => {
        if (cardUser.hidden) cardUser.hidden = false
      })
      document.getElementById('msg-user-no-content').hidden = true
    }else{
      document.getElementById('msg-user-no-content').hidden = false
    }




  } else {
    let countValues = 0


    cardUsers.forEach(cardUser => {
      cardUser.hidden = true
    })

    cardUsersRole.forEach(cardUserRole => {
      if (cardUserRole.value === selectRole.value) {
        cardUserRole.parentElement.hidden = false
        countValues++
      }
    })


    if (countValues > 0) {
      document.getElementById('msg-user-no-content').hidden = true
    } else {
      document.getElementById('msg-user-no-content').hidden = false
    }
  }
}


document.getElementById('select-role-user').addEventListener('change', () => {
  filterCardUsers()
})

document.addEventListener('DOMContentLoaded', () => {
  filterCardUsers()
})

