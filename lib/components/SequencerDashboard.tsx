import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ExecutionPanel from './ExecutionPanel';
import SequenceTable from './SequenceTable';
import ReloadUpdate from './ReloadUpdate';
import ModuleModificationsDetected from './ModuleModificationsDetected';
import MessageLog from './MessageLog';

import { useAdapterEndpoint, type AdapterEndpoint } from '@dssg/odin-react';
import { SequencerTypes } from './EndpointTypes';

interface SequencerDashboardProps {
  endpoint_name: string;
  endpoint_url: string;
  poll_interval: number;
}

function SequencerDashboard({ endpoint_name, endpoint_url, poll_interval }: SequencerDashboardProps) {

  const sequencerEndpoint = useAdapterEndpoint<SequencerTypes>(endpoint_name, endpoint_url, poll_interval); 
  // For the benefit of ReloadUpdate knowing when a trigger has changed
  const [reloadTrigger, setReloadTrigger] = useState(0);

  return (
    <Col>
      <Row>
        <ExecutionPanel
          endpoint={sequencerEndpoint}
        />
        <ReloadUpdate
          endpoint={sequencerEndpoint}
          reloadTrigger={reloadTrigger}
        />
        <ModuleModificationsDetected
          endpoint={sequencerEndpoint}
        />
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <SequenceTable
            endpoint={sequencerEndpoint}
            onReload={() => setReloadTrigger(prev => prev+1)}
          />
        </Col>
        <Col xs={12} lg={6}>
          <MessageLog endpoint_name={endpoint_name} endpoint_url={endpoint_url} poll_interval={poll_interval}/>
        </Col>
      </Row>
    </Col>
  );
}

export default SequencerDashboard;
