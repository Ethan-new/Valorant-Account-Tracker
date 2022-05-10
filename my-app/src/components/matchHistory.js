import React from "react";



fetch('apikey.txt')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	console.log(data);
  });

class MatchHistory extends React.Component {

   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/0HX0mD2FOvozsGvHHmHvLDYtJ22pSHLX7oEukffIlufteH0?api_key=RGAPI-0c8bd4bd-8f65-4ed9-b77e-b4a942dc2a10")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
                console.log(this.state.items)
            })

    }



    render() {
        if(this.state.DataisLoaded == true) {
        return (
            <div>
                {this.state.items[0].summonerName}
            </div>
        )
        }
        else 
        return (
            <div>
                Loading
            </div>
        )
}
}
   
export default MatchHistory;