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

const getPosId = (position) => {
    if (position === "President" || position === "president") return '665a9aa31ba50da59be2d66b';
    else if (position === "Vice President" || position === "vicePresident") return '665a9b6d1ba50da59be2d66d';
    else if (position === "General Secretary" || position == "generalSecretary") return '665aed420ad0dd3ae812ce08';
}

export const addCandidateToServer = async (form) => {
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const posID = getPosId(data.position);
        // const formattedPosition = data.position.toLowerCase().replace(/ /g, "");
        // const oldData = await fetchCandidatesFromServer();
        // console.log(oldData);
        const newObject = {
            candidates: [
                // ...oldData[formattedPosition],
                {
                    name: data.name,
                    college: data.college,
                    collegeInitials: data.collegeInitials,
                    voteCount: data.voteCount
                }
            ]
        }
        // console.log(newObject);

        const response = await fetch(`${BASE_URL}/candidates/${posID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        });
        // console.log(response);
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
export const deleteCandidateFromServer = async (objectId, position) => {
    try {
        const posID = getPosId(position);
        const response = await fetch(`${BASE_URL}/candidates/${posID}/${objectId}`);
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
        console.log(fetchedData);
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
        console.log(data);
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}


export const addVoteInServer = async (position, candidateID) => {
    const positionID = getPosId(position);
    try {
        const response = await fetch(`${BASE_URL}/candidates/votesUpdate/${positionID}/${candidateID}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const loginInServer = async (body) => {
    try {
        const res = await fetch(`${BASE_URL}/voters/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
        );
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

function extractReceipt(username) {
    let parts = username.split('@');
    return parts[1];
}

export const ChangePasswordInServer = async (body) => {
    try {
        if (body.NewPassword !== body.ConfirmNewPassword) {
            return "Passwords do not match!"
        }
        const originalCredentials = {
            email: body.email,
            password: body.password
        };
        const res = await loginInServer(originalCredentials);
        const responseData = await res.json();
        if (responseData.status != 'success') {
            return "Invalid Credentials"
        }
        const receipt = extractReceipt(body.email);
        const allVoters = await fetchVotersFromServer();

        const voter = allVoters.find(obj => obj.receiptNo == receipt);
        console.log(voter);
        if (!voter) { return "Invalid Credentials"; }

        voter.password = body.NewPassword;
        // const res2 = await updateDataInServer(voter);
        // return res2.ok ? "success" : "error in changing password";
        return "route not set yet!"
    } catch (err) {
        return "error";
    }
}