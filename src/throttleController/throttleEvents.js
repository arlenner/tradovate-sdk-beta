export const ThrottleEvents = {
    'push': [],
    'in': [],
    'reject': [],
    'resume': [],
    'pause': [],
}

ThrottleEvents.emit = function(type, data) {
    if(ThrottleEvents[type] && ThrottleEvents[type].length > 0) {
        ThrottleEvents[type].forEach(async cb => await cb(data));
    }
}

ThrottleEvents.on = function(type, callback) {
    ThrottleEvents[type] ||= [];
    ThrottleEvents[type].push(callback);
    return () => {
        ThrottleEvents[type].splice(ThrottleEvents[type].indexOf(callback), 1);
    }
}

ThrottleEvents.off = function(type, callback) {
    if(ThrottleEvents[type]) {
        ThrottleEvents[type].splice(ThrottleEvents[type].indexOf(callback), 1);
    }
}
