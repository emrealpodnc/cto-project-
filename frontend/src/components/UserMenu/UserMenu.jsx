import "./UserMenu.css";

function UserMenu() {

    const email = localStorage.getItem("email");

    return (
        <div className="user-menu">

            <span className="user-name">
                👤 {email}
            </span>

        </div>
    );

}

export default UserMenu;