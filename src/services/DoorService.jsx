const token = sessionStorage.getItem('token');

export async function getDoors() {
    try {
        const response = await fetch(`${localStorage.getItem("url")}/doors`, {
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

        return data.map(door => ({
            id: door.id,
            name: door.name,
            accessLevel: door.accessLevel
        }));

    } catch (error) {
        console.error("getting users failed:", error);
        return [];
    }
}

export async function createDoor(name, passcode, accessLevel) {
    await fetch(`${localStorage.getItem("url")}/doors/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            doorName: name,
            passcode: passcode,
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

export async function deleteDoor(userId) {
    fetch(`${localStorage.getItem("url")}/doors/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(m => console.log(m))
        .catch(error => {
            console.error("Failed to link picture:", error);
        });
}

export async function changeDoorPasscode(newPassword) {
    fetch(`${localStorage.getItem("url")}/doors/change-password/${newPassword}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
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

export async function changeDoorAccessLevel(userId, level) {
    try {
        const response = await fetch(`${localStorage.getItem("url")}/doors/${userId}/change-access-level/${level}`, {
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