import { useState, useEffect, FC, FunctionComponent, useRef } from 'react';

const AsyncComponentLoader: FC<{ loadComponent: any }> = ({ loadComponent }) => {
    const [done, setDone] = useState<boolean>(false);
    const ComponentRef = useRef<FunctionComponent | null>(null)
    useEffect(() => {
        window.setTimeout(() => {
            loadComponent().then((component: any) => {
                setDone(true);
                ComponentRef.current = component.default;
            });
        }, 1000);
    }, [loadComponent]);

    if (!done || !ComponentRef.current) {
        return <div>Loading...</div>;
    }

    return <ComponentRef.current />;
}

export default AsyncComponentLoader;