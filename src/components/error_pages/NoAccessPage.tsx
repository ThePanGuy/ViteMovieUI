import Header from "../Header";

export function NoAccessPage() {
    return (
        <>
            <Header/>
            <div style={{marginLeft: "40px"}}>
                <h3>Oops!</h3>
                <p>You have no access to this page.</p>
            </div>
        </>
    )
}