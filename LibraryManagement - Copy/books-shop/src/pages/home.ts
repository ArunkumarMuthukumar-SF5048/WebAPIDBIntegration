import * as APICALLS from '../api/apicalls';
export async function renderHome(container:HTMLElement){
    var user =  await APICALLS.isAuthenticated();
    container.innerHTML= `<h2>Welcome ${user.name} to our Library Management Website</h2>  <img src="/images/library.png" width="1000" height="500">`;
}