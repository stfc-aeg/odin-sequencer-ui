# odin-sequencer-react-ui

React component library for integrating with the [ODIN Sequencer](https://github.com/stfc-aeg/odin-sequencer). Provides a reusable UI dashboard and components for building and controlling sequences.

## Installation

Add to your `package.json` dependencies:

```json
"dependencies": {
  "bootstrap": "^5.3.6",
  "odin-react": "github:stfc-aeg/odin-react",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.10",
  "react-dom": "^18.3.1",
  "odin-sequencer-react-ui": "github:stfc-aeg/odin-sequencer-ui"
}
```

Then install using `npm install`


## Basic Usage

import components individually

```js
import {
  OdinSequencer,
  OdinSequencerEndpoint,
  OdinSequencerExecutionPanel,
  OdinSequencerMessageLog,
  OdinSequencerModuleList,
  OdinSequencerSequenceButtons,
  OdinSequencerSequenceTable
} from 'odin-sequencer-react-ui';
```

Ensure Bootstrap CSS is available in your app (either top level or where you use the sequencer components)

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```


## Example

```js
import { useRef, useEffect, useState } from 'react';
import {
  OdinSequencer,
  OdinSequencerEndpoint,
  OdinSequencerExecutionPanel,
  OdinSequencerMessageLog,
  OdinSequencerModuleList,
  OdinSequencerSequenceButtons,
  OdinSequencerSequenceTable
} from 'odin-sequencer-react-ui';

function App() {
  const [sequenceModules, setSequenceModules] = useState({});
  const executionPanelRef = useRef(null);
  const [abortDisabled, setAbortDisabled] = useState(true);

  const fetchModules = () => {
    return OdinSequencerEndpoint.get('')
      .then(result => {
        setSequenceModules(result.sequence_modules);
      })
      .catch(err => {
        console.error("Error fetching endpoint data:", err);
      });
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <>
      <p>(Page loaded successfully)</p>
      <div className="alert-box" id="alert-container"></div>
      <OdinSequencer />
      <OdinSequencerExecutionPanel
        ref={executionPanelRef}
        abortDisabled={abortDisabled}
        setAbortDisabled={setAbortDisabled}
      />
      <OdinSequencerMessageLog />
      <OdinSequencerModuleList
        sequence_modules={sequenceModules}
        executionPanelRef={executionPanelRef}
        setAbortDisabled={setAbortDisabled}
      />
      <OdinSequencerSequenceButtons
        reloadModules={fetchModules}
        executionPanelRef={executionPanelRef}
        setAbortDisabled={setAbortDisabled}
      />
      <OdinSequencerSequenceTable
        fetchModules={fetchModules}
        sequenceModules={sequenceModules}
        executionPanelRef={executionPanelRef}
        setAbortDisabled={setAbortDisabled}
      />
    </>
  );
}

export default App;
```

## API

### `OdinSequencer`
A fully integrated dashboard that includes all the core components.  
Use this if you want an all-in-one solution — no additional setup or props required.

---

### `OdinSequencerMessageLog`
Displays the sequencer's message log inside a React card.  
**No setup or dependencies required.**

---

### `OdinSequencerExecutionPanel`
Contains the execution bar and an abort button. Hidden by default — becomes visible when a sequence is running.  
**Required if using any of the components listed below** that rely on controlling execution state.

**Required state/refs:**

```js
const executionPanelRef = useRef(null);
const [abortDisabled, setAbortDisabled] = useState(true);
```

---

### OdinSequencerModuleList
Displays available sequence modules in a plain list/table format.

**Required state/refs:**
- Fetched sequence modules
- A reference to the execution panel
```js
const [sequenceModules, setSequenceModules] = useState({});
const executionPanelRef = useRef(null);
const [abortDisabled, setAbortDisabled] = useState(true);
OdinSequencerExecutionPanel
```

---

### OdinSequencerSequenceButtons
Provides "Reload" and "Detect Changes" controls for the sequence modules.
Usually used alongside the module table.

**Requires:**
- fetchModules function
- Execution panel reference
```js
  fetchModules();
  const executionPanelRef = useRef(null);
  const [abortDisabled, setAbortDisabled] = useState(true);
  OdinSequencerExecutionPanel
```

---

### OdinSequencerSequenceTalbe
Combines `OdinSequencerModuleList` and `OdinSequencerSequenceButtons` into a single card UI for interacting with sequences.
Includes both the module display and control buttons.

**Requires:**
- Fetched module data
- fetchModules function
- Execution panel reference
```js
  fetchModules();
  const [sequenceModules, setSequenceModules] = useState({});
  const executionPanelRef = useRef(null);
  const [abortDisabled, setAbortDisabled] = useState(true);
  OdinSequencerExecutionPanel
```

---

### OdinSequencerEndpoint
Provides API access methods for interacting with the backend.
Primarily used by your fetchModules function.

**Typical usage:**
```js
OdinSequencerEndpoint.get('').then(...)
```

---

> Note:
> To enable alert rendering correctly, ensure the following is present in your HTML/JSX
> ```jsx
> <div className="alert-box" id="alert-container"></div>
> ```



## Compatibility

- React 18+ — Required. Minor version differences are supported, but major versions other than 18 will fail.
- Bootstrap 5 — Required for correct styling.
- React-Bootstrap — Used for layout and components.
- Build tools:
  - Tested with Vite
  - Should also work with other react build system.