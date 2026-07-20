import { AdapterEndpoint } from '@dssg/odin-react';
import SequenceCard from "./SequenceCard";
import { Col } from "react-bootstrap";
import { SequencerTypes, SequenceModuleTypes, SequenceModuleParamTypes } from "./EndpointTypes";

/* Creates a row within the accordion, for each sequence to go into. */

interface CardRowProps {
  endpoint: AdapterEndpoint<SequencerTypes>;
  sequences: SequenceModuleTypes;
  moduleName: string;
}

const CardRow = ({ endpoint, sequences, moduleName } : CardRowProps) => {

  const sequenceEntries = Object.entries(sequences) as [string, SequenceModuleParamTypes][];

  const cards = sequenceEntries.map(([sequenceName, sequenceConfig]) => (
    <Col key={sequenceName} xs={4} className="mb-2">
      <SequenceCard
        endpoint={endpoint}
        moduleName={moduleName}
        sequenceName={sequenceName}
        sequenceConfig={sequenceConfig}
      />
    </Col>
  ));  

  return (cards)
};

export default CardRow;