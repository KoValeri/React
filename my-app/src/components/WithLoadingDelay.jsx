import './Loading.css';
import { useState } from 'react';
import { useEffect } from 'react';

function WithLoadingDelay(WrappedComponent) {
  return function LoadingDelay(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return isLoading ? (
      <div className="for-loader">
        <div className="loader"></div>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
}

export default WithLoadingDelay;
