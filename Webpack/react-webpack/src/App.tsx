import { FC, Suspense, lazy, forwardRef, useEffect, createContext, useLayoutEffect, useRef, useContext, useState, memo } from 'react';
import AsyncComponentLoader from './AsyncComponentLoader';

// const LazyMyComponent = lazy(() => import(/* webpackChunkName: "AsyncComponent" */ './AsyncComponent') as any);

// const App = () => {
//     const loadComponent = () => import(/* webpackChunkName: "AsyncComponent" */ './AsyncComponent');
//     return <div>
//         Hello World
//         {/* <Suspense fallback={<div>loading...</div>}>
//             <LazyMyComponent />
//         </Suspense> */}
//         <AsyncComponentLoader loadComponent={loadComponent}>

//         </AsyncComponentLoader>
//     </div>;
// }

class Node {
    children: Node[] = [];
    parent: null | Node = null;
    dom: null | HTMLElement = null;
}


/** ui */
const Button: FC<any> = forwardRef<HTMLDivElement>((props, ref) => {
    return <div style={{ height: 100, width: 100 }} ref={ref}></div>
});
const ScrollView: FC<any> = forwardRef<HTMLDivElement>((props, ref) => {
    return <div style={{ height: 100, width: 100 }} ref={ref}></div>;
});

/** proxy ui */
const ButtonProxy = () => {
    return <Button ref={ref}></Button>;
}



const CardComponent = () => {
    return <ScrollView>
        <Button></Button>
    </ScrollView>
}

const PeviewView = () => {

}

const PeviewViewRoot = () => {
    return <div>

    </div>;
}

const App = () => {
    const nodeRef = useRef<Node>(new Node());
    useEffect(() => {
    }, []);
    return <PreviewContext.Provider value={{ node: nodeRef.current }}>
        <PeviewViewRoot></PeviewViewRoot>
        <CardComponent></CardComponent>
    </PreviewContext.Provider>
}

const TestContext = createContext({});
const TestA = () => {
    console.log('a render');
    const { a } = useContext<any>(TestContext);
    return <div>{a}</div>
}
const TestB = () => {
    console.log('b render');
    const { b } = useContext<any>(TestContext);
    return <div>{b}</div>
}
const TestC = () => {
    console.log('c render');
    return <div>ccc</div>
}

const TestProvider: FC<any> = (props) => {
    return <TestContext.Provider value={props.value}>
        {props.children}
    </TestContext.Provider>
}

const ChildrenComponent = memo(() => {
    return <>
        <TestA></TestA>
        <TestB></TestB>
        <TestC></TestC>
    </>;
});


const TestApp = () => {
    const [stateA, setStateA] = useState(0);
    const testContext = useRef({
        a: stateA,
        b: 2,
    });
    useEffect(() => {
        window.setTimeout(() => {
            setStateA(3);
        }, 5000)
    }, []);
    return <TestProvider value={testContext.current}>
        <TestA></TestA>
        <TestB></TestB>
        <TestC></TestC>
    </TestProvider>
}

export default TestApp;