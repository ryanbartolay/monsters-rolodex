import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: "",
      meaningOfLife: 47 + this.props.increment
    };
  }
  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  handleClick = () => {
    this.setState(
      (prevState, prevProps) => {
        return { meaningOfLife: prevState.meaningOfLife + prevProps.increment };
      },
      () => {
        console.log(this.state.meaningOfLife);
      }
    );
  };
  handleSearch = e => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    const { monsters, searchField, meaningOfLife } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        You searched for {this.state.searchField}
        {meaningOfLife}
        <button onClick={this.handleClick}>Increment</button>
        <SearchBox placeholder="Search HERE" handleSearch={this.handleSearch} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
