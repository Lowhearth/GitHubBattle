var React = require ('react');
var Link = require ('react-router-dom').Link;


function PlayerPreview (props){
  return(
    <div>
      <div className='column'>
        <img className='avatar' src={props.avatar} alt = {`Avatar for ${props.username}`} />
        <h2 className='username'>@{props.username}</h2>

      </div>
      <button className='reset' onClick={props.onReset.bind(null,props.id)}>
      Reset
      </button>

    </div>

  )
}

class PlayerInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: ""
    }
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    var value = event.target.value;

    this.setState(function() {
      return {username: value
     }
   }
 )
  }
  handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render(){

    return (
      <div>
        <form className='column' onSubmit={this.handleSubmit}>
          <label className='header' htmlFor='username'>
            {this.props.label}
          </label>
          <input id ='username' placeholder='Github Username' type= 'text' autoComplete='off' value={this.state.username} onChange={this.handleChange}/>
          <button className ='button' type= 'submit' disabled= {!this.state.username} >
            Submit
          </button>
          </form>

      </div>

    )
  }
}


class Battle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerOneName:'',
      playerTwoName:'',
      playerOneImage:null,
      playerTwoImage:null
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
  }
  handleSubmit (id, username){
    this.setState(function () {
      var newState = {};
        newState[id +'Name'] = username;
        newState[id + 'Image'] = 'http://github.com/' + username+ '.png?size=200';
        return newState;
    })
  }
  handleReset(id){
    this.setState(function(){
      var newState ={}
      newState[id +'Name'] = '';
      newState[id+'Image'] = null;
      return(newState);
    })

  }

  render(){
  return(
      <div className='mybody'>
        <div className ='row'>
          { !this.state.playerOneName &&
            <PlayerInput id ='playerOne' label ='Player One' onSubmit = {this.handleSubmit}/>}
          { this.state.playerOneImage !== null &&
            <PlayerPreview id ='playerOne' avatar={this.state.playerOneImage} onReset ={this.handleReset} username = {this.state.playerOneName}/>}
            <h1>VS</h1>
          { !this.state.playerTwoName&&
          <PlayerInput id ='playerTwo' label ='Player Two' onSubmit = {this.handleSubmit}/>}
          { this.state.playerTwoImage !== null &&
          < PlayerPreview id ='playerTwo' avatar={this.state.playerTwoImage} onReset = {this.handleReset} username ={this.state.playerTwoName}/>}

        </div>
        {this.state.playerTwoImage !==null && this.state.playerOneImage !== null &&
        <Link className='button' to ={ { pathname: this.props.match.url + '/results', search: '?playerOneName='+this.state.playerOneName + '&playerTwoName='+ this.state.playerTwoName } }> Start </Link>}
      </div>

      )
    }
  }
module.exports = Battle;
