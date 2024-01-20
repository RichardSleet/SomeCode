let listenerId = 0;
const createStore = (reducer, enhancer, state) => {
    if (typeof enhancer !== 'undefined') {
        return enhancer(createStore)(reducer, state)
    }
    let currentListeners = new Map()
    let nextListeners = currentListeners
    let currentState = state;
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = new Map()
            currentListeners.forEach((listener, key) => {
                nextListeners.set(key, listener)
            })
        }
    }
    const getState = () => {
        return currentState;
    }
    const subscribe = (listener) => {
        ensureCanMutateNextListeners();
        listenerId = listenerId++
        nextListeners.set(listenerId, listener)
        return () => {
            ensureCanMutateNextListeners()
            nextListeners.delete(listenerId)
            currentListeners = null
        }
    }
    const dispatch = (action) => {
        if (action.type && typeof action.type === 'string') {
            currentState = reducer(currentState, action);
            const listeners = (currentListeners = nextListeners)
            listeners.forEach(listener => {
                listener();
            });
            return action;
        }
    }
    dispatch({ type: 'init' });
    const store = {
        dispatch,
        subscribe,
        getState,
    };
    return store;
}

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        Object.keys(reducers).forEach(reducerKey => {
            const previousState = state[reducerKey];
            const nextState = reducers[reducerKey](previousState, action);
            state[reducerKey] = nextState;
        });
        return state;
    }
}

const compose = (...fns) => {
    if (fns.length === 1) {
        return fns;
    }
    let result = fns.reduce(
        (a, b) => {
            return (...args) => a(b(...args));
        }
    )
    return result;
};

const applyMiddleware = (...middlewares) => {
    return createStore => (reducer, state) => {
        const store = createStore(reducer, state);
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => store.dispatch(action, ...args)
        }
        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        const dispatch = compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch
        }
    }
}

export {
    createStore,
    combineReducers,
    applyMiddleware,
}