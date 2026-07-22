import SequenceModule from './SequenceModule'
import Accordion from 'react-bootstrap/Accordion';
import type { AdapterEndpoint } from '@dssg/odin-react';
import { SequenceModuleTypes, SequencerTypes } from './EndpointTypes';

interface ModuleListProps {
  endpoint: AdapterEndpoint<SequencerTypes>;
}

/* Initialises a SequenceModule component for each module found in the object. */

const ModuleList = ({ endpoint }: ModuleListProps ) => {

    const sequenceModules = (endpoint.data?.sequence_modules ?? {}) as Record<string, SequenceModuleTypes>;
    const sortedModules = Object.entries(sequenceModules).sort(
      ([a], [b]) => a.localeCompare(b)
    )

    return (
      <Accordion alwaysOpen>
        {sortedModules.map(([moduleName, sequences]) => (
            <SequenceModule
              endpoint={endpoint}
              key={moduleName}
              moduleName={moduleName}
              sequences={sequences}
            />
          ))
        }
      </Accordion>
      );
}

export default ModuleList