import CardRow from './CardRow'
import { Row, Accordion } from 'react-bootstrap'

import type { AdapterEndpoint } from '@dssg/odin-react';
import { SequencerTypes, SequenceModuleTypes } from './EndpointTypes';

interface SequenceModuleProps {
  endpoint: AdapterEndpoint<SequencerTypes>;
  moduleName: string;
  sequences: SequenceModuleTypes;
}
/* Constructs Accordion layer for each sequence module, then intialises the CardRow to display sequences. */

const SequenceModule = ({ endpoint, moduleName, sequences }: SequenceModuleProps) => {
  return (
    <Accordion.Item eventKey={moduleName}>
      <Accordion.Header>{moduleName}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <CardRow
            endpoint={endpoint}
            sequences={sequences}
            moduleName={moduleName}
          />
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default SequenceModule