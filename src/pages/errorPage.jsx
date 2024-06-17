import { Link } from "react-router-dom";
export const ErrorPage = () => (
    <div className="d-flex flex-column align-center justify-content-center" style={{ height: '60vh' }}>
        <h1 className="text-center m-3">Oops! Something went wrong.</h1>
        <p className="text-center m-2">We're sorry for the inconvenience. Please try going the home page or contact support if the problem persists.</p>
        {/* <a className="btn btn-primary d-inline-block m-3" href='/'>Home Page</a> */}
        <p className="mt-3">
            <a
                href="/"
                class="fs-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                Home Page
            </a></p>
    </div>
);

export default ErrorPage;
