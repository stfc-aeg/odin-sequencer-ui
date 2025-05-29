import { useRef, useEffect, useState } from 'react';
import { useAdapterEndpoint } from 'odin-react';
import { OdinSequencerSequenceTable, OdinSequencer, OdinSequencerExecutionPanel, OdinSequencerMessageLog, OdinSequencerModuleList, OdinSequencerSequenceButtons } from 'odin-sequencer-react-ui';


function App() {

  const sequencer_endpoint = useAdapterEndpoint("odin_sequencer", import.meta.env.VITE_SEQUENCER_ENDPOINT_URL);

  const [sequenceModules, setSequenceModules] = useState({});
  const executionPanelRef = useRef(null);
  const [abortDisabled, setAbortDisabled] = useState(true);

  const fetchModules = () => {
    return sequencer_endpoint.get('')
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
      {/* <OdinSequencer sequencer_endpoint={sequencer_endpoint} /> */}
      <OdinSequencerExecutionPanel ref={executionPanelRef} abortDisabled={abortDisabled} setAbortDisabled={setAbortDisabled} sequencer_endpoint={sequencer_endpoint} />
      <OdinSequencerMessageLog />
      <OdinSequencerModuleList sequence_modules={sequenceModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} />
      <OdinSequencerSequenceButtons reloadModules={fetchModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} sequencer_endpoint={sequencer_endpoint} />
      <OdinSequencerSequenceTable fetchModules={fetchModules} sequenceModules={sequenceModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} sequencer_endpoint={sequencer_endpoint} />
    </>
  )
}

export default App
