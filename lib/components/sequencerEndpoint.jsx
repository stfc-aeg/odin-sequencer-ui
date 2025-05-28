import { AdapterEndpoint } from './AdapterEndpointWrapper';

const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
const sequencer_endpoint = new AdapterEndpoint("odin_sequencer", ENDPOINT_URL);

export default sequencer_endpoint;
