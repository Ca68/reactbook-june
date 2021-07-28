import React, { useContext } from 'react';
import {Post} from './Post';
import {DataContext} from '../contexts/DataProvider';


export const PostList = (props) => {
    const { postList } = useContext(DataContext);
    const [posts] = postList;

    return (
        <ul className='list-group'>
                {posts.map( p => <Post key={ p.postId } post={p} />)}

            </ul>
    )
}

