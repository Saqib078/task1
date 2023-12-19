import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Loading from '../../component/loading/Loading';
function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const secret = 'youraregood';
    // Update cart state
    const payload = {
        iss: "ecommerce",
        aud: "yourname"
    };
    const header = {
        "alg": 'HS256',
    }
    const encodeHeader = btoa(JSON.stringify(header));
    const payloadString = btoa(JSON.stringify(payload));
    const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
    const jwt = `${encodeHeader}.${payloadString}.${signature}`;

    const search_views = () => {
        setIsLoading(true);
        axios.get(`https://api.shreeaadyapicture.com/wayoutsearch.php?query=${searchQuery}`, {
            headers: {
                'Content-Type': 'multipart/dataToPost',
                Authorization: `Bearer ${jwt}`
            },
        })
            .then((response) => {
                setSearchResults(response.data);
                console.log(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
            });
    };
    useEffect(() => {
        search_views();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);
    if (isLoading) {
        return <>
            <Loading />
        </>
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>{result.id}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
