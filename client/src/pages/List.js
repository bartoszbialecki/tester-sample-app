import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    fetch("/api/test")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          list: [responseJson.message]
        });
      });
  };

  render() {
    const { list } = this.state;

    return (
      <div>
        <h1>List</h1>
        {list.length ? (
          <div>
            {list.map(item => {
              return <div>{item}</div>;
            })}
          </div>
        ) : (
          <div>
            <h2>There are no items.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default List;
