import useSWR from 'swr';

const baseURL = "http://34.205.37.182/api/v1";
const response = (...args) => fetch(...args).then(res => res.json())

const Fetcher = (endpoint) => {

    const {data, error, isLoading } = useSWR(`${baseURL}${endpoint}`, response)

    return {
        data,
        isLoading,
        isError: error
    }
}

export default Fetcher;