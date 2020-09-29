const DarkTheme = {
    isEnabled: false,
    subscribers: [],
    subscribe(fn){
        this.subscribers.push(fn);
    },
    next(v){
        this.subscribers.forEach(fn=>fn(v));
    }
};
DarkTheme.subscribe(v=>DarkTheme.isEnabled=v);

export {
    DarkTheme
};
