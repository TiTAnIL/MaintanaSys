import { useDispatch, useSelector } from "react-redux";
import { Login } from "../cmps/login";
import { Shop } from "./shop";
import { useEffect } from "react";
import { loadUsers } from "../store/actions/user.actions";

export function AlufApp() {

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadUsers())
    // }, [dispatch, loadUsers])

    const isAuthenticated = useSelector(state => state.userModule.isAuthenticated);

    return (
        <div className="main-app-layout">
            <div>
                {isAuthenticated ? <Shop /> : <Login />}
            </div>
        </div>
    )
}