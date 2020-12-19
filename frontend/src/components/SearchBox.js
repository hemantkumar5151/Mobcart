import React, { useState} from 'react';
import { Form, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
const SearchBox = () => {
    const [keyWord, setKeyword] = useState('');
    const history = useHistory();
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyWord.trim()) {
            history.push(`/search/${keyWord}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
              <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-3'
                    ></Form.Control>
                    <Button type='submit' variant='outline-success my-3' className='p-2'>
                        Search
                    </Button>
        </Form>
    )
}

export default SearchBox
