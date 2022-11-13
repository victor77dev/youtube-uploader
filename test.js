var client;
var access_token;

var SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';

function initClient() {
    client = google.accounts.oauth2.initTokenClient({
        client_id: process.env.YOUTUBE_CLIENT_ID,
        scope: SCOPE,
        callback: (tokenResponse) => {
            access_token = tokenResponse.access_token;
        },
    });
}
function getToken() {
    client.requestAccessToken();
}
function revokeToken() {
    google.accounts.oauth2.revoke(access_token, () => {console.log('access token revoked')});
}
function loadCalendar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send();
}
