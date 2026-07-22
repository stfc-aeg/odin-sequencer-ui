import { Col, Row, Accordion } from 'react-bootstrap';
import { TitleCard, type AdapterEndpoint } from '@dssg/odin-react';

import ModuleList from './ModuleList'
import SequenceButtons from './SequenceButtons'
import { SequencerTypes } from './EndpointTypes';


interface SequenceTableProps {
  endpoint: AdapterEndpoint<SequencerTypes>;
  onReload?: (args: unknown) => void;
}

const SequenceTable = ({ endpoint, onReload }: SequenceTableProps) => {
  return (
    <TitleCard title={
      <Row>
        <Col xs={3} className="d-flex align-items-center" style={{fontSize:'1.3rem'}}>Sequences</Col>
        <Col xs={9}><SequenceButtons endpoint={endpoint} onReload={onReload}/></Col>
      </Row>
    }>
      <Col>
        <Accordion>
          <ModuleList
            endpoint={endpoint}
          />
        </Accordion>
      </Col>
    </TitleCard>
  )
}

export default SequenceTable
