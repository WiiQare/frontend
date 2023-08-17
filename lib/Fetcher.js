import useSWR from 'swr';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const Fetcher = (endpoint, token = null) => {

    const response = (...args) => fetch(...args, { headers: { 'Authorization': token ? `Bearer ${token}` : null } }).then(res => res.json())

    const { data, error, isLoading } = useSWR(`${baseURL}${endpoint}`, response)

    return {
        data,
        isLoading,
        isError: error
    }
}

export default Fetcher;