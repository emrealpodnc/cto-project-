import "./Header.css";

import SearchBar from "../SearchBar/SearchBar";
import Notification from "../Notification/Notification";
import UserMenu from "../UserMenu/UserMenu";

function Header() {

    return (

        <header className="header">

            <SearchBar />

            <div className="header-right">

                <Notification />

                <UserMenu />

            </div>

        </header>

    );

}

export default Header;