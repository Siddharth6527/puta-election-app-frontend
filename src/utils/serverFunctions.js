const BASE_URL = "http://localhost:3000/api/v1";
// const BASE_URL = "https://puta-election-app-backend.onrender.com/api/v1";

export const addDataToServer = async (form) => {
    try {
        const formData = new FormData(form);
        const response = await fetch(`${BASE_URL}/voters/signup`, {
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
        const response = await fetch(`${BASE_URL}/voters/${data._id}`, {
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
        const response = await fetch(`${BASE_URL}/voters/${objectId}`, {
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


const changeFormat = (arr) => {
    return arr.reduce((acc, current) => {
        const formattedPosition = current.position.toLowerCase().replace(/ /g, "");
        acc[formattedPosition] = current.candidates;
        return acc;
    }, {});
};

export const fetchCandidatesFromServer = async () => {
    try {
        const response = await fetch(`${BASE_URL}/candidates`);
        const fetchedData = await response.json();
        const data = changeFormat(fetchedData.data);
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
export const fetchVotersFromServer = async () => {
    try {
        const response = await fetch(`${BASE_URL}/voters`)
        const fetchedData = await response.json();
        const data = fetchedData.data.voters;
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

const ids = {
    president: '665a9aa31ba50da59be2d66b',
    vicePresident: '665a9b6d1ba50da59be2d66d',
    generalSecretary: '665aed420ad0dd3ae812ce08'
}

export const addVoteInServer = async (position, candidateID) => {
    const positionID = ids[position];
    try {
        const response = await fetch(`${BASE_URL}/candidates/votesUpdate/${positionID}/${candidateID}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}