// import logo from '../assets/imgs/logo.png'
import { useSelector } from "react-redux"

export function AppHeader() {

    // const isAuthenticated = useSelector((state) => state.authModule.isAuthenticated)


    return (
        <header className='app-header'>
            <div>
                <h4>Aluf logo</h4>
                {/* { isAuthenticated ? <div> */}
                    {/* <button>LogOut</button> */}
                {/* </div> : <button>LogIn</button> }  */}
            </div>
        </header>
    )
}
    