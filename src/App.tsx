import 'bootstrap/dist/css/bootstrap.min.css';

import { OdinApp } from '@dssg/odin-react';
import { OdinSequencer } from 'odin-sequencer-ui';

function App() {

    const endpoint_url = import.meta.env.VITE_ENDPOINT_URL;

    const navLinks = ["Sequencer"]

    return (
      <OdinApp title="Sequencer" navLinks={navLinks}>
        <OdinSequencer endpoint_name={'odin_sequencer'} endpoint_url={endpoint_url} poll_interval={1000}/>
      </OdinApp>
    )
}

export default App;