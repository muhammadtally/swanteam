import './navbar.css';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default props => {

    const { user, signOut } = useAuthenticator((context) => [context.user]);

    return (
        <div className="nav-bar-container-light">
            <img
                src="https://i.ibb.co/Ns5R5d8/team-swan-logo.png"
                className="website-logo"
                alt="website logo"
            />
            <div className="middle-items ">

                <h5>ברוך הבא, {user.attributes.name}</h5>
                
            </div>   
            
        </div>
    );
};