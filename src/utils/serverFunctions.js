export const addDataToServer = async (form) => {
    try {
        const formData = new FormData(form);
        const response = await fetch('http://localhost:3000/api/v1/voters/signup', {
            // const response = await fetch('https://puta-election-app-backend.onrender.com/api/v1/voters/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        });
        return response;
    } catch (error) {
        console.log('error: ', error);
    }
}

export const updateDataInServer = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/voters/${data._id}`, {
            // const response = await fetch(`https://puta-election-app-backend.onrender.com/api/v1/voters/${newRow.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        console.log("error", error);
    }
}

export const deleteDataFromServer = async (objectId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/voters/${objectId}`, {
            // const response = await fetch(`https://puta-election-app-backend.onrender.com/api/v1/voters/${objectId}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.log("error", error);
    }
}

export const convertToServerObject = (obj) => {
    return {
        _id: obj._id,
        sno: obj.id,
        name: obj.Name,
        designation: obj.Designation,
        college: obj.College,
        receiptNo: obj.RNo,
        voted: obj.VoteStatus,
        memebershipCategory: obj.MembershipCategory,
        email: obj.email,
        password: obj.password,
    }
}