import React from "react";
import { UserConsumer } from "./UserContext";

class UserMenu extends React.Component {
  state = {
    menuVisible: false
  };

  avatarRef = React.createRef();

  componentDidMount() {
    document.addEventListener("click", this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.hideMenu);
  }

  hideMenu = e => {
    if (e.target !== this.avatarRef.current) {
      this.setState({ menuVisible: false });
    }
  };

  toggleMenu = () => {
    this.setState(state => ({
      menuVisible: !state.menuVisible
    }));
  };

  render() {
    return (
      <UserConsumer>
        {context => {
          const { user, onLogout } = context;
          console.log("userMenu", context);
          return (
            <div className="UserMenu">
              <img
                className="UserAvatar"
                alt="User avatar"
                src={user.avatar}
                onClick={this.toggleMenu}
                ref={this.avatarRef}
              />
              {this.state.menuVisible && (
                <ul>
                  <li onClick={onLogout}>Logout</li>
                </ul>
              )}
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

export default UserMenu;
