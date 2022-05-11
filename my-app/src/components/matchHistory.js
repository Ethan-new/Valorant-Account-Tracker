import React from "react";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"

class MatchHistory extends React.Component {
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            nameSearch:"",
            tagSearch:"",
            DataisBad: false,
            showAlert:false
        };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {

    }

    handleChangeName(event) {    this.setState({nameSearch: event.target.value});  }
    handleChangeTag(event) {    this.setState({tagSearch: event.target.value});  }

    handleSubmit(event) {
    if (this.state.nameSearch == "" || this.state.tagSearch == "") {
        this.setState({
            showAlert: true
         });
        return;
    }
    this.setState({
        showAlert: false
     });
    fetch(
        "https://api.henrikdev.xyz/valorant/v1/mmr/na/" +this.state.nameSearch +"/" + this.state.tagSearch)
        .then((res) => res.json())
        .then((json) => {

            var newitems = this.state.items
            
            if (json.status == 200) {
                newitems.push(json)
            } else {
                this.setState({
                    showAlert: true
                 });
            }

            this.setState({
                items: newitems,
                DataisLoaded: true,
                nameSearch: "",
                tagSearch:""
             });
            console.log(this.state.items)
        })
        .catch(error => {
            this.setState({

                DataisBad: true

             });
            console.error('There was an error!', error);
        });


    
      //alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
        if(this.state.DataisLoaded == true && this.state.DataisBad == false && this.state.showAlert == false) {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title="Region"
                            id="input-group-dropdown-1"
                            >
                            <Dropdown.Item href="#">NA</Dropdown.Item>
                            <Dropdown.Item href="#">Europe</Dropdown.Item>
                        </DropdownButton>
                            <InputGroup.Text>Name and Tagline</InputGroup.Text>
                            <FormControl aria-label="Name"  value={this.state.nameSearch} onChange={this.handleChangeName} placeholder="Name"/>
                            <FormControl aria-label="Tagline" value={this.state.tagSearch} onChange={this.handleChangeTag} placeholder="Tag"/>
                            <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSubmit}>
                            Search
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div></div>
                <Row xs={2} md={6} className="g-4">
                    {this.state.items.map((i) => (
                        <Col>
                            <Card style={{ width: '18rem'}} border="info" >
                            <Card.Body>
                                <Card.Title>{i.data.name +"#" + i.data.tag}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{i.data.currenttierpatched + " " + i.data.ranking_in_tier+"rr -"+i.data.elo + "mmr"}</Card.Subtitle>
                                <Card.Text>
                                Last game rr gained/lost was: {i.data.mmr_change_to_last_game}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
                
            </div>

        )
        }
        else if (this.state.showAlert == true) {
            return (
                <div>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                        <InputGroup className="mb-3">
                            <DropdownButton
                                variant="outline-secondary"
                                title="Region"
                                id="input-group-dropdown-1"
                                >
                                <Dropdown.Item href="#">NA</Dropdown.Item>
                                <Dropdown.Item href="#">Europe</Dropdown.Item>
                            </DropdownButton>
                                <InputGroup.Text>Name and Tagline</InputGroup.Text>
                                <FormControl aria-label="Name"  value={this.state.nameSearch} onChange={this.handleChangeName} placeholder="Name"/>
                                <FormControl aria-label="Tagline" value={this.state.tagSearch} onChange={this.handleChangeTag} placeholder="Tag"/>
                                <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSubmit}>
                                Search
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <div></div>
                    <Row xs={2} md={6} className="g-4">
                        {this.state.items.map((i) => (
                            <Col>
                                <Card style={{ width: '18rem'}} border="info" >
                                <Card.Body>
                                    <Card.Title>{i.data.name +"#" + i.data.tag}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{i.data.currenttierpatched + " " + i.data.ranking_in_tier+"rr -"+i.data.elo + "mmr"}</Card.Subtitle>
                                    <Card.Text>
                                    Last game rr gained/lost was: {i.data.mmr_change_to_last_game}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                    <Alert key="danger" variant="danger">
                        User Not Found (They may have private mode enabled or they do not exist)
                    </Alert>
                </div>
    
            )
        } else {
            return (
                <div>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                    <InputGroup className="mb-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title="Region"
                            id="input-group-dropdown-1"
                            >
                            <Dropdown.Item href="#">NA</Dropdown.Item>
                            <Dropdown.Item href="#">Europe</Dropdown.Item>
                        </DropdownButton>
                            <InputGroup.Text>Name and Tagline</InputGroup.Text>
                            <FormControl aria-label="Name"  value={this.state.nameSearch} onChange={this.handleChangeName} placeholder="Name"/>
                            <FormControl aria-label="Tagline" value={this.state.tagSearch} onChange={this.handleChangeTag} placeholder="Tag"/>
                            <Button variant="outline-secondary" id="button-addon2" onClick={this.handleSubmit}>
                            Search
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>


            )
        }


}
}
   
export default MatchHistory;