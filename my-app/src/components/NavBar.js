import React from "react";

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
class NavBar extends React.Component {
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {

        };
    }
   

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {

    }


    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="#home">
                        <img
                        alt=" "
                        src="../imgs/valicon.webp"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                    Valorant Helper
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Leaderboard">Leaderboard</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            
            
            </>
        )

    }
}
   
export default NavBar;