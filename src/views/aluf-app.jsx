import { Login } from "../cmps/login";
export function AlufApp() {
    return (
        <div className="main-app-layout">
            <div>
                {/* TODO: check auth, if true navigate to shop,
            if false show login form */}
                <Login />
            </div>
        </div>
    )
}