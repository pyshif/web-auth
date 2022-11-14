import { useState, useEffect, useCallback, PropsWithoutRef } from 'react';

export type ActionUseScript = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string,
}

function useScript(src: string, options?: { async: boolean, defer: boolean }) {
    if (!options) {
        options = { async: false, defer: false }
    }

    const [action, setAction] = useState<ActionUseScript>({
        status: 'idle',
    });

    // life
    useEffect(() => {
        let script: any;
        // loading
        setAction({
            status: 'loading'
        });

        try {
            script = document.createElement('script') as any;
            if (!script) throw new Error('Create script tag failed!');
            if (!document.body.appendChild(script)) throw new Error('Appending script tag failed!');

            Object.keys(options as any).forEach(key => {
                script[key] = (options as any)[key];
            });
            script.onload = () => {
                // succeeded
                setAction({
                    status: 'succeeded',
                });
            }
            script.src = src;

        } catch (error) {
            // failed
            setAction({
                status: 'failed',
                error: (error as any).message as string
            });
        }

        return () => {
            if (!script) return;
            document.body.removeChild(script);
            setAction({
                status: 'idle'
            });
        }
    }, [src]);

    return action;
}

export default useScript;