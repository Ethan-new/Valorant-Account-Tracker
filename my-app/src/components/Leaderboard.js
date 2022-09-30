import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "./leaderboard.css";
import background from "../imgs/homeBackGround.jpg";

class Leaderboard extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      isSearching: true,
      items: [],
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch("https://api.henrikdev.xyz/valorant/v1/leaderboard/na")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          isSearching: false,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  render() {
    if (this.state.isSearching == true) {
      return <div>Loading...</div>;
    }

    return (
      <body>
        <div className="">
          <Container id="leaderboardCon" className="">
            <Row>
              <Col></Col>
              <Col xs={6}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Games Won</th>
                      <th>RR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map((i, idx) => (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          {i.gameName}#{i.tagLine}
                        </td>
                        <td>{i.numberOfWins}</td>
                        <td>{i.rankedRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </body>
    );
  }
}

export default Leaderboard;
