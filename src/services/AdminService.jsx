const mail =  sessionStorage.getItem("ses-mail");
const token = sessionStorage.getItem('token');

export async function createAdmin(email, password) {
    await fetch(`${localStorage.getItem("url")}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      body: JSON.stringify({ 
        email: email, 
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        alert(data.error);
      } else if (data.result == 0) {
        // setCongrat('Admin added successfully')
      }
    })
    .catch(error => {
      console.error("Failed to add admin:", error);
    });
}

export async function changePassword(oldPswd, newPswd) {
    fetch(`${localStorage.getItem("url")}/auth/change-password`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
    },
      body: JSON.stringify({ 
        email: mail,
        password: newPswd,
        oldPassword: oldPswd
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result == 1) {
        alert(data.error);
      } 
    //   else if (data.result == 0) {
        // setCongrat('Password changed successfully')
    //   }
    })
    .catch(error => {
      console.error("Failed to change password:", error);
    });
}