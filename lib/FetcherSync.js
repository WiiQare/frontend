import useSWR from "swr";

const baseURL = "https://xxxx.com";

const FetcherSync = () => {
  const postRequest = (endpoint, token = null) => {
    const response = (...args) =>
      fetch(...args, {
        headers: { Authorization: token ? `Bearer ${token}` : null },
      }).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
      `${baseURL}${endpoint}`,
      response
    );

    return { data, error, isLoading };
  };

  return {
    postRequest,
  };
};

export default FetcherSync;
