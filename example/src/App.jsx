import { useRef, useEffect, useState } from 'react';
//import { SequenceTable, sequencer_endpoint, SequencerDashboard, ExecutionPanel, MessageLog, ModuleList, SequenceButtons } from '/Users/williamcross/Tech/odin-sequencer/app/odin-sequencer-react-ui';
//import { SequenceTable, sequencer_endpoint, SequencerDashboard, ExecutionPanel, MessageLog, ModuleList, SequenceButtons } from '/Users/williamcross/test/python/odin-sequencer-ui/odin-sequencer-ui';
import { OdinSequencerSequenceTable, OdinSequencerEndpoint, OdinSequencer, OdinSequencerExecutionPanel, OdinSequencerMessageLog, OdinSequencerModuleList, OdinSequencerSequenceButtons } from 'odin-sequencer-react-ui';


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
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchModules();
  }, [])

  return (
    <>
      <p>
        (page loaded successfully)
      </p>
      <div className="alert-box" id="alert-container"></div>
      {/* <OdinSequencer /> */}
      <OdinSequencerExecutionPanel ref={executionPanelRef} abortDisabled={abortDisabled} setAbortDisabled={setAbortDisabled} />
      <OdinSequencerMessageLog />
      {/* <OdinSequencerModuleList sequence_modules={sequenceModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} /> */}
      {/* <OdinSequencerSequenceButtons reloadModules={fetchModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} /> */}
      <OdinSequencerSequenceTable fetchModules={fetchModules} sequenceModules={sequenceModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} />
    </>
  )
}

export default App
