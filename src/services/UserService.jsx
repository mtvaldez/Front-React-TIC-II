const token = sessionStorage.getItem('token');

export async function getUsers() {
  try {
    const response = await fetch(`${localStorage.getItem("url")}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await response.json();

    if (data.result === 1) {
      alert(data.error);
      return [];
    }

    return data.map(user => ({
      id: user.uuid,
      fullName: user.fullName,
      cid: user.cid,
      accessLevel: user.accessLevel,
      hasRfid: user.hasRfid,
      hasFace: user.hasFace
    }));

  } catch (error) {
    console.error("getting users failed:", error);
    return [];
  }
}

export async function createUser(fullName, cid, accessLevel) {
    await fetch(`${localStorage.getItem("url")}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      },
      body: JSON.stringify({ 
        fullName: fullName, 
        cid: cid, 
        accessLevel: accessLevel
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        alert(data.error);
      } else if (data.result == 0) {
        setCongrat('User added successfully')
      }
    })
    .catch(error => {
      console.error("Failed to add user:", error);
    });
}

export async function changeUserAccessLevel(userId, level) {
    try {
        const response = await fetch(`${localStorage.getItem("url")}/users/${userId}/change-access-level/${level}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

    } catch (error) {
        console.error("Change User Access Level Failed:", error);
        alert("Network or server error");
    }
}

export async function setUserRFID(userId, rfid) {
    try {
        const response = await fetch(`${localStorage.getItem("url")}/users/${userId}/rfid/${rfid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            }
            })
        // const data = await response.json();
    } catch (error) {
        console.error("Failed to Asociate RFID: ", error);
        return [];
    }
}

export function setUserFace(userId, base64String) {
    fetch(`${localStorage.getItem("url")}/users/${userId}/vector`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        },
        body: base64String
        
      })
        .then(response => response.json())
        .then(data => {
          if (data.result == 1) {
            alert(data.error);
          } else if (data.result == 0) {
            console.log(data.picst);
            setCongrat('Picture linked successfully');
          }
        })
        .catch(error => {
          console.error("Failed to link picture:", error);
        });
        
      }
      
export async function deleteUser(userId) {
  fetch(`${localStorage.getItem("url")}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(m => console.log(m))
    .catch(error => {
      console.error("Failed to link picture:", error);
    });
  
}
