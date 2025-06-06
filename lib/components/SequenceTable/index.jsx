import Accordion from 'react-bootstrap/Accordion';
import ModuleList from '../ModuleList'
import SequenceButtons from '../SequenceButtons'
import { Col } from 'react-bootstrap';

import './styles.css';

const SequenceTable = ({ fetchModules, sequenceModules, executionPanelRef, setAbortDisabled, sequencer_endpoint }) => {
    return (
        <>
            <div className="ui-card">
                <div className="ui-card-header d-flex align-items-center">Sequences <SequenceButtons reloadModules={fetchModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} sequencer_endpoint={sequencer_endpoint}></SequenceButtons></div>
                <div className="ui-card-body message-box">
                    <Col sm={7}>
                    <Accordion>
                        <ModuleList sequence_modules={sequenceModules} executionPanelRef={executionPanelRef} setAbortDisabled={setAbortDisabled} sequencer_endpoint={sequencer_endpoint}></ModuleList>
                    </Accordion>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default SequenceTable