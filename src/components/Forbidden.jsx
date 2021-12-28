import { useHistory } from "react-router-dom";

export default function Forbidden() {
    const history = useHistory();
    setTimeout(() => history.push("/"), 5000);

    return (
        <div id="forbidden">
            <div className="forbidden">
                <div className="forbidden-oops">
                    <h1>Oops!</h1>
                </div>
                <h2>You havn't logined,<br />or your token has expired.</h2>
                <p>This page will skip to Home after <b>5</b> seconds,<br />Or you can directly ---</p>
                <a href="/home">Click Here</a>
            </div>
        </div>
    )
}