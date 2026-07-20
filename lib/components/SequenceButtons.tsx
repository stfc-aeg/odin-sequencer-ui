import { Button, Form, Stack } from 'react-bootstrap';
import { WithEndpoint, type AdapterEndpoint, EndpointButton } from '@dssg/odin-react';
import { SequencerTypes } from './EndpointTypes';

interface SequenceButtonsProps {
  endpoint: AdapterEndpoint<SequencerTypes>;
  onReload: (args: unknown) => void;
}

const EndpointCheck = WithEndpoint(Form.Check);

// The optional onReload function here should simply 
const SequenceButtons = ({ endpoint, onReload } : SequenceButtonsProps) => {

    return (
      <Form>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <EndpointCheck
            endpoint={endpoint}
            fullpath="detect_module_modifications"
            type="switch"
            label="Detect Changes"
          />
          <EndpointButton
            endpoint={endpoint}
            fullpath="reload/execute"
            value={true}
            post_method={onReload}
          >
            Reload
          </EndpointButton>
        </Stack>
      </Form>
    );
};

export default SequenceButtons;
