const fetchData = async (url: string, options = {}) => {
    try {
        const response: Response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error(`Error fetching data: ${err}`)
        throw err;
    }
};

export default fetchData;
