import React, { useEffect, useState } from 'react';

import Loader from '../../Loader';

export default function Stats () {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('URL_DE_L_API_GRAFANA', {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer VOTRE_CLE_API',
            },
        });
        const result = await response.json();
        setData(result);
        };

        fetchData();
    }, []);

    return (
        <>
            <section className='section-stats'>
            <h2>Ici vont apparaitre les données</h2>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : (
                    <Loader/>
                )}
            </section>
        </>
    )
}