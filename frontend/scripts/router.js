import { HomeComponent } from "./components/home-component.js";
import { ErrorComponent } from "./components/error-component.js";
import { UserListComponent } from "./components/user-list-component.js";
import { UserDetailsComponent } from "./components/user-details-component.js";
import { CreateUserComponent } from "./components/create-user-component.js";

const routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UserListComponent},
    { path: 'create-user', component: CreateUserComponent},
    { path: 'user-details', component: UserDetailsComponent}
];

export function parseLocation () {
    return location.hash.slice(1).toLowerCase() || '';
}

let findComponentByPath = function (path, routes) {
    return routes.find(function(routes) {
        return routes.path.match(new RegExp(`^${path}$`, 'gm'));
    });
};

//const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^${path}$`, 'gm'))) || undefined;

function router() {
    
    const path = parseLocation();
    console.log('path', path);
    //Add error component
    if (path !== 'edit-user') {
        const { component = ErrorComponent  } = findComponentByPath(path, routes) || {};
        console.log(findComponentByPath(path, routes));
        document.getElementById('main').innerHTML = component.render();
    }
    
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
