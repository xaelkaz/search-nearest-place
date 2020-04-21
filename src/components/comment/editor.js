import { Form, Button, Input } from 'antd';
import React from "react";

const { TextArea } = Input;

export const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={ 4 } onChange={ onChange } value={ value }/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={ submitting } onClick={ onSubmit } type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);
