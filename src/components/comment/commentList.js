import { Comment, List } from 'antd';
import React from "react";

export const CommentList = ({ comments }) => (
    <List
        dataSource={ comments }
        header={ `${ comments.length } ${ comments.length > 1 ? 'replies' : 'reply' }` }
        itemLayout="horizontal"
        renderItem={ props => <Comment { ...props } /> }
    />
);
