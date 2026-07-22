import type { ParamNode } from '@dssg/odin-react';

export interface SequenceModuleParamTypes extends ParamNode {
    default: any;
    type: string;
    value: any;
}

export interface SequenceModuleTypes extends ParamNode {
    string: SequenceModuleParamTypes;
}

export interface SequencerTypes extends ParamNode {
    abort: null;
    detect_module_modifications: boolean;
    execute: string;
    execution_progress: {
        current: number;
        total: number;
    };
    is_aborting: boolean;
    is_executing: boolean;
    last_message_timestamp: string;
    log_messages: string[];
    module_modifications_detected: boolean;
    process_tasks: string[];
    reload: {
        execute: boolean;
        status: string;
        success: boolean;
    };
    sequence_modules: {
        string: SequenceModuleTypes;
    }
}   