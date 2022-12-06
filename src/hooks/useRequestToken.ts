import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { apiRequestToken } from 'store/features/authSlice';


function useRequestToken() {
    // request access-token by refresh-token which store in cookies (http-only, secure)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(apiRequestToken())
            .then(() => {
                // console.log('request token success!');
            })
            .catch((error) => {
                // console.log('request token failed!');
            });
    }, []);
}


export default useRequestToken;
