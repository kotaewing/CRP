import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

export function personalWarnings(inputObj = {}) {
    let warningId = uuid();
    return {
        ...inputObj,
        id: warningId,
        text: '',
        order: '',
        severity: ''
    }
}

export function selfManagement(inputObj = {}) {
    let strategyId = uuid();
    return {
        ...inputObj,
        id: strategyId,
        text: '',
        order: ''
    }
}

export function reasonsToLive(inputObj = {}) {
    let reasonId = uuid();
    return {
        ...inputObj,
        id: reasonId,
        text: '',
        order: ''
    }
}

export function socialSupport(inputObj = {}) {
    let socialId = uuid();
    return {
        ...inputObj,
        id: socialId,
        socialName: '',
        order: '',
        email: '',
        phone: '',
        canContact: false
    }
}

export function professionalSupport(inputObj = {}) {
    let professionalId = uuid();
    return {
        ...inputObj,
        id: professionalId,
        professionalName: '',
        order: '',
        email: '',
        phone: '',
        canContact: true
    }
}