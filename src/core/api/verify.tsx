import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

export default function useAuthHeaderFunc() {
    const header = useAuthHeader();
    return header;
}