function FooterComponent() 
{

    // //picking up context to access shared state.
    // const authContext = useContext(AuthContext)
    
    // //we can use the shared value now.
    // console.log(`Footer component - ${authContext.number}`);

    return(
        <footer className='footer'>
            <div className = "container">
                Your Footer
            </div>
        </footer>
    )
}

export default FooterComponent