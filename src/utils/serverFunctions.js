// const BASE_URL = `"http://localhost:3000/api/v1";
const BASE_URL = "https://puta-election-app-backend.onrender.com/api/v1";

const getToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found, please login first");
  }
  return token;
};
const getPosId = (position) => {
  if (position === "President" || position === "president")
    return "665a9aa31ba50da59be2d66b";
  else if (position === "Vice President" || position === "vicePresident")
    return "665a9b6d1ba50da59be2d66d";
  else if (position === "General Secretary" || position == "generalSecretary")
    return "665aed420ad0dd3ae812ce08";
};

export const addDataToServer = async (form) => {
  try {
    // const token = getToken();
    const formData = new FormData(form);
    const response = await fetch(`${BASE_URL}/voters/signup`, {
      method: "POST",
      headers: {
        // 'Authorization': `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const addCandidateToServer = async (form) => {
  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const posID = getPosId(data.position);
    const newObject = {
      candidates: [
        {
          name: data.name,
          college: data.college,
          collegeInitials: data.collegeInitials,
          voteCount: data.voteCount,
        },
      ],
    };
    const token = getToken();
    const response = await fetch(`${BASE_URL}/candidates/${posID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    });
    return response;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const updateDataInServer = async (data) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/voters/${data._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteDataFromServer = async (objectId) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/voters/${objectId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteCandidateFromServer = async (objectId, position) => {
  try {
    const token = getToken();
    const posID = getPosId(position);
    const response = await fetch(
      `${BASE_URL}/candidates/${posID}/${objectId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

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
  };
};

const changeFormat = (arr) => {
  return arr.reduce((acc, current) => {
    const formattedPosition = current.position.toLowerCase().replace(/ /g, "");
    acc[formattedPosition] = current.candidates;
    return acc;
  }, {});
};

export const fetchCandidatesFromServer = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/candidates`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const fetchedData = await response.json();
    // console.log(fetchedData);
    const data = changeFormat(fetchedData.data);
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchVotersFromServer = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/voters?`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const fetchedData = await response.json();
    const data = fetchedData.data.voters;
    // console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const addVoteInServer = async (position, candidateID, voterID) => {
  const positionID = getPosId(position);
  const data = {
    posId: positionID,
    canId: candidateID,
    voterId: voterID,
  };
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/candidates/votesUpdate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      localStorage.setItem("hasVoted", true);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginInServer = async (body) => {
  try {
    const res = await fetch(`${BASE_URL}/voters/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const ChangePasswordInServer = async (body) => {
  try {
    if (body.password !== body.passwordConfirm) {
      return "Passwords do not match!";
    }
    const token = getToken();
    const res = await fetch(`${BASE_URL}/voters/updatePassword`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    return "error";
  }
};

export const getResultVisibility = async () => {
  try {
    const allVoters = await fetchVotersFromServer();
    const admin = allVoters.find((voter) => voter.role === "dev");
    const visiblity = admin.voted;
    return visiblity;
  } catch (err) {
    console.log("error", err);
  }
};

export const toggleResultsVisiblity = async (value) => {
  try {
    const allVoters = await fetchVotersFromServer();
    const admin = allVoters.find((voter) => voter.role === "dev");
    const data = { ...admin, voted: value };
    const res = await updateDataInServer(data);
    // const responseData = await res.json();
    if (res.ok) console.log("success changed visiblity");
    else console.log("error in change visibility");
  } catch (err) {
    console.log(err);
  }
};

export const resetVotes = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/candidates/resetVotes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.log("error", err);
  }
};
