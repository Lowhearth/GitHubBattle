var React = require ('react');
var api = require ('../util/api');


function SelectLanguage (props) {

      var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Phyton']
    return(
      <ul className='languages'>
       { languages.map( (lang) => {
        return (
           <li
           style = { lang === props.selectedLanguage ? {color: '#d0021b'} : null }
           key ={lang}
           onClick = {() => props.onSelect(lang)}>
            {lang}
           </li>
         )
       })
     }
      </ul>
    )

}

function RepoGrid (props){

  return (
    <ul className ="popular-list">
      {props.repos.map((repo, index) => (
        <li key = {index} className ="popular-item" >
          <div className = 'popular-rank'># {index + 1}</div>
          <ul>
            <li>
              <img  className='avatar' src ={repo.owner.avatar_url}/>
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>
              @{repo.owner.login}
            </li>
            <li>
                {repo.stargazers_count} stars
            </li>
          </ul>
        </li>
      ))}
    </ul>

  )
}



class Popular extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedLanguage: 'All',
      repos : null
    }
     this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
  this.setState(function () {
    return {
      selectedLanguage: lang,
      repos: null
    }
  });

  api.fetchPopularRepos(lang)
    .then(function (repos) {
      this.setState(function () {
        return {
          repos: repos
        }
      });
    }.bind(this));
}

  render(){


    return(
      <div>
      <div>
        <SelectLanguage selectedLanguage = {this.state.selectedLanguage} onSelect = {this.updateLanguage}/>
      </div>
      { !this.state.repos ?  <p>loading</p> : <RepoGrid repos= {this.state.repos}/> }
      </div>

    )
  }

}

module.exports = Popular;
