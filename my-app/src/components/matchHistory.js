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
import Modal from "react-bootstrap/Modal"
import ListGroup from "react-bootstrap/ListGroup"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Table from "react-bootstrap/Table"
import Image from 'react-bootstrap/Image'
function SearchBar(adult) {
        return (       
        <>
        <p className="text-center">Search For A User. You do not have to include the # in tag.</p>             
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
                </DropdownButton>
                    <InputGroup.Text>Name and Tagline</InputGroup.Text>
                    <FormControl aria-label="Name"  value={adult.props.state.nameSearch} onChange={adult.props.handleChangeName} placeholder="Name"/>
                    <FormControl aria-label="Tagline" value={adult.props.state.tagSearch} onChange={adult.props.handleChangeTag} placeholder="Tag"/>
                    <Button variant="outline-secondary" id="button-addon2" onClick={adult.props.handleSubmit}>
                    Search
                    </Button>
                </InputGroup>
            </Col>
            <Col>
            </Col>
        </Row>
        </>
    )
}

function PlayerCards(adult) {

    return(
    <Row xs={2} md={6} className="g-4">
    {adult.props.state.items.map((i) => (
        <Col>
            <Card style={{ width: '18rem'}} border="info" >
            <Card.Body>
                <Card.Title>{i.data.name +"#" + i.data.tag}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{i.data.currenttierpatched + " " + i.data.ranking_in_tier+"rr -"+i.data.elo + "mmr"}</Card.Subtitle>
                <Card.Text>
                Last game rr gained/lost was: {i.data.mmr_change_to_last_game}
                </Card.Text>
                <Card.Link onClick={() => adult.onShow(i.data.name, i.data.tag)}>View Last 5 Ranked Games</Card.Link>
            </Card.Body>
            
        </Card>
    </Col>
    ))}
</Row>
)
}


function FindWinner (team, array) {

    if (team == 1 && array.blue.has_won == true) {
        return("bg-success")
    } 
    if (team == 1 && array.blue.has_won == false) {
        return("bg-danger")
    } 
    if (team == 2 && array.red.has_won == true) {
        return("bg-success")
    } 
    if (team == 2 && array.red.has_won == false) {
        return("bg-danger")
    } 
}

function FindMap (map, maparray) {

    switch(map){
        case "Ascent":
            return (maparray[0].listViewIcon)
        case "Split":
            return (maparray[1].listViewIcon)
        case "Fracture":
            return (maparray[2].listViewIcon)
        case "Bind":
            return (maparray[3].listViewIcon)
        case "Breeze":
            return (maparray[4].listViewIcon)
        case "Icebox":
            return (maparray[5].listViewIcon)
        case "Haven":
            return (maparray[7].listViewIcon)
    }

    return (maparray[0].listViewIcon)
}
function PlayerMatchHistory(props) {


    if (props.name != "" && props.isplayerset == false && props.modalShow == true) {
    fetch(
        "https://api.henrikdev.xyz/valorant/v3/matches/na/" +props.name +"/"+props.tag + "?filter=competitive")
        .then((res) => res.json())
        .then((json) => {
        var temp = 1
            
            json.data.map((i, idx) => {
                console.log(i.is_available)
                if (i.is_available == false) {
                    json.remove(idx)
                }
            })
            if (temp != 2) {
                props.setPlayer(json)
            }
   
            console.log(json)
        })
        .catch(error => {
        });
    }

    
    if (props.isplayerset == false) {
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Loading...
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          )
    }
    else if(props.player == undefined) {
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  This Players Info Is Private
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          )
    } else if (props.isplayerset == true){
        return (
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {props.name}#{props.tag}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        {props.player.data.map((x, idx) => (
                            <Tab eventKey={idx} title={"Game "+idx} >
                                {x.metadata.map} - {x.metadata.cluster} Team 1: {x.teams.blue.rounds_won} Team 2: {x.teams.blue.rounds_lost}
                                <Image src={FindMap(x.metadata.map,props.mapImgs)} responsive circle width="770" height="130"/>
                                <div>
                                <Table responsive="sm" striped 	>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Agent</th>
                                        <th>K/D/A</th>
                                        <th>HS/BS/LS</th>
                                        <th>Damage Done/Taken</th>
                                        <th>Rank</th>
                                        <th>Level</th>
                                    </tr>
                                    </thead>
                                    Team 1
                                    <tbody>
                                    {x.players.blue.map((i, idx) => (
                                        <tr >
                                        <td class={FindWinner(1,x.teams)}>{i.name}#{i.tag}</td>
                                        <td class={FindWinner(1,x.teams)}><Image src={i.assets.agent.small} responsive circle width="50"/> </td>
                                        <td class={FindWinner(1,x.teams)}>{i.stats.kills}/{i.stats.deaths}/{i.stats.assists}</td>
                                        <td class={FindWinner(1,x.teams)}>{i.stats.headshots}/{i.stats.bodyshots}/{i.stats.legshots}</td>
                                        <td class={FindWinner(1,x.teams)}>{i.damage_made}/{i.damage_received}</td>
                                        <td class={FindWinner(1,x.teams)}><Image src={props.rankedImgs[i.currenttier].smallIcon} responsive circle width="45"/> </td>
                                        <td class={FindWinner(1,x.teams)}>{i.level}</td>
                                    </tr>
                                        ))}
                                    </tbody>
                                    Team 2
                                    <tbody>
                                    {x.players.red.map((i, idx) => (
                                        <tr>
                                        <td class={FindWinner(2,x.teams)}>{i.name}#{i.tag}</td>
                                        <td class={FindWinner(2,x.teams)}><Image src={i.assets.agent.small} responsive circle width="50"/> </td>
                                        <td class={FindWinner(2,x.teams)}>{i.stats.kills}/{i.stats.deaths}/{i.stats.assists}</td>
                                        <td class={FindWinner(2,x.teams)}>{i.stats.headshots}/{i.stats.bodyshots}/{i.stats.legshots}</td>
                                        <td class={FindWinner(2,x.teams)}>{i.damage_made}/{i.damage_received}</td>
                                        <td class={FindWinner(2,x.teams)}><Image src={props.rankedImgs[i.currenttier].smallIcon} responsive circle width="45"/> </td>
                                        <td class={FindWinner(2,x.teams)}>{i.level}</td>
                                    </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                </div>


                            </Tab>
                        ))}
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          )
    }

  }

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
            showAlert:false,
            modalShow: false,
            selectedPlayerName:"",
            selectedPlayerTag:"",
            selectedPlayer:[],
            isSelectedPlayerFound:false,
            ranks: [],
            maps:[]
        };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
   


    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        //get ranked imgs
        fetch(
            "https://valorant-api.com/v1/competitivetiers")
            .then((res) => res.json())
            .then((json) => {

                this.setState({
                    ranks: json.data[3].tiers,
                });

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
                //get map imgs
                fetch(
                    "https://valorant-api.com/v1/maps")
                    .then((res) => res.json())
                    .then((json) => {
                        this.setState({
                            maps: json.data
                        });
        
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
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
            })
            .catch(error => {
                this.setState({

                    DataisBad: true

                });
                console.error('There was an error!', error);
            });
      event.preventDefault();
    }


    render() {
        if(this.state.DataisLoaded == true && this.state.DataisBad == false && this.state.showAlert == false) {
        return (
            <div>
                <SearchBar props={this}/>
                <PlayerCards props={this} onShow={(name,tag) =>this.setState({modalShow: true,selectedPlayerName:name,selectedPlayerTag:tag})}/>
                <PlayerMatchHistory
                    show={this.state.modalShow}
                    onHide={() =>this.setState({modalShow: false,isSelectedPlayerFound:false})}
                    name={this.state.selectedPlayerName}
                    tag={this.state.selectedPlayerTag}
                    setPlayer={(player) =>this.setState({selectedPlayer:player,isSelectedPlayerFound:true})}
                    isplayerset={this.state.isSelectedPlayerFound}
                    player={this.state.selectedPlayer}
                    modalShow={this.state.modalShow}
                    rankedImgs={this.state.ranks}
                    mapImgs={this.state.maps}
                    
                 />
            </div>
        )
        }
        else if (this.state.showAlert == true) {
            return (
                <div>
                <SearchBar props={this}/>
                <PlayerCards props={this} onShow={(name,tag) =>this.setState({modalShow: true,selectedPlayerName:name,selectedPlayerTag:tag})}/>
                <Alert key="danger" variant="danger">
                    User Not Found (They may have private mode enabled or they do not exist)
                </Alert>
                <PlayerMatchHistory
                    show={this.state.modalShow}
                    onHide={() =>this.setState({modalShow: false,isSelectedPlayerFound:false})}
                    name={this.state.selectedPlayerName}
                    tag={this.state.selectedPlayerTag}
                    setPlayer={(player) =>this.setState({selectedPlayer:player,isSelectedPlayerFound:true})}
                    isplayerset={this.state.isSelectedPlayerFound}
                    player={this.state.selectedPlayer}
                    modalShow={this.state.modalShow}
                    rankedImgs={this.state.ranks}
                    mapImgs={this.state.maps}
                 />
                </div>
            )
        } else {
            return (
            <div>
  
                <SearchBar props={this}/>
            </div>
            )
        }


}
}
   
export default MatchHistory;