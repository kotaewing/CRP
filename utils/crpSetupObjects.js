import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

export function personalWarnings() {
    let warningId = uuid();
    return {
        id: warningId,
        warning: '',
        order: '',
        severity: ''
    }
}

export function selfManagement() {
    let strategyId = uuid();
    return {
        id: strategyId,
        strategy: '',
        order: ''
    }
}

export function reasonsToLive() {
    let reasonId = uuid();
    return {
        id: reasonId,
        reason: '',
        order: ''
    }
}

export function socialSupport() {
    let socialId = uuid();
    return {
        id: socialId,
        socialName: '',
        order: '',
        email: '',
        phone: '',
        canContact: false
    }
}

export function professionalSupport() {
    let professionalId = uuid();
    return {
        id: professionalId,
        professionalName: '',
        order: '',
        email: '',
        phone: '',
        canContact: true
    }
}