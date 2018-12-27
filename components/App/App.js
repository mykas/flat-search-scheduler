import React from 'react';
import axios from 'axios';

import { Layout, Cell } from '../Layout/Layout';
import Header from '../Layout/Header/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ads: [],
      loaded: false,
    };
  }
  async componentDidMount() {
    const aruodas = await axios.get('/api/ads');
    this.setState({
      loaded: true,
      ads: aruodas.data,
    });
  }
  render() {
    return (
      <div>
        <Header dataHook="header" />
        <Layout>
          <Cell span={12} />
        </Layout>
      </div>
    );
  }
}

export default App;
