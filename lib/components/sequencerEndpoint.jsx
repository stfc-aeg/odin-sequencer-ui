import { AdapterEndpoint } from './AdapterEndpointWrapper';

const ENDPOINT_URL = import.meta.env.VITE_SEQUENCER_ENDPOINT_URL || 'http://127.0.0.1:8888';
console.log(ENDPOINT_URL)
const sequencer_endpoint = new AdapterEndpoint("odin_sequencer", ENDPOINT_URL);

export default sequencer_endpoint;
