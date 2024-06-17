export const NotFoundPage = () => (
    <div className="d-flex flex-column align-center justify-content-center" style={{ height: '60vh' }}>
        <h1 className="text-center m-3">404 NOT FOUND</h1>
        <p className="text-center m-2 fs-3">We could not find the page you were looking for</p>
        <p className="mt-3">
            <a
                href="/"
                class="fs-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                Home Page
            </a></p>
    </div>
);

export default NotFoundPage;
