var React = require ('react');


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



class Popular extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedLanguage: 'All'
    }
     this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage (lang){
    this.setState(
      {
        selectedLanguage: lang
      }
    )
  }

  render(){


    return(
      <div>
        <SelectLanguage selectedLanguage = {this.state.selectedLanguage} onSelect = {this.updateLanguage}/>
      </div>

    )
  }

}

module.exports = Popular;
