export const checkToken = () => {
    const now = new Date().getTime();
    const initialTime = JSON.parse(localStorage.getItem('initialTime'));
    const oneHour = 60 * 60 * 1000;
    if (now - initialTime > oneHour) {
        localStorage.clear();
        console.log("token has expired");
    }
}