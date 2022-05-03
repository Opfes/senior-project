export default function authHeader() {
    //get user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    //place token in header if possible
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
  