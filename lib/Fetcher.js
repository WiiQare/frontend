import useSWR from 'swr';

const baseURL = "https://api.wiiqare-app.com/api/v1";

const Fetcher = (endpoint, token = null) => {

    console.log(token);

    const response = (...args) => fetch(...args, { headers: { 'Authorization': token ? `Bearer ${token}` : null } }).then(res => res.json())

    const { data, error, isLoading } = useSWR(`${baseURL}${endpoint}`, response)

    return {
        data,
        isLoading,
        isError: error
    }
}

export default Fetcher;