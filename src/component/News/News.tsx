import React, {useEffect, useState} from 'react';
import Card from "../Card/Card";
import {
    CircularProgress,
    Grid,
    Typography
} from "@material-ui/core";
import axios from 'axios';

const News = (props: any) => {

    const [ newsList, setNewsList ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>('');

    useEffect(() => {
        setLoading(true)
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res: any) => {
                setNewsList(res.data)
                setLoading(false)
            })
            .catch((error: Error) => {
                setError(error.message)
                setLoading(false)
            })
    },[]);

    return (
        <div className={"listContainer"}>
            <Card title={"News"} variant={'h4'} align={'left'} />
            {loading && <CircularProgress />}
            {error && <Typography>{error}</Typography>}
            {newsList && !loading && (
            <Grid container spacing={3}>
                {newsList && newsList.map((news: any) => {
                    return (
                        <Grid item md={12} lg={12} sm={12}>
                            <Card title={news.title} variant={'h6'} align={'left'}>
                                <Typography>{news.body}</Typography>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>)}
        </div>
    )
};

export default News;
