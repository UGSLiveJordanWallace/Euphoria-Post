import React, { useContext, useState } from 'react'
import Comment from './Comment';
import { Button, Card, Accordion, AccordionContext, useAccordionToggle, Alert } from 'react-bootstrap';
import Axios from 'axios';
import Comments from './Comments';

const Post = ({ header, id, post, index }) => {
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);

  function handleGetComment() {
    Axios.get('https://eph-app.herokuapp.com/get-comment').then((response) => {
      if (response.data.errorMessage) {
        setError(response.data.errorMessage);
      } else {
        setComments(response.data);
      }
    });
  }
  
  function ContextAwareToggle({ children, eventKey, callback }) {
      const currentEventKey = useContext(AccordionContext);
    
      const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
      );
    
      const isCurrentEventKey = currentEventKey === eventKey;
    
      return (
        <button
          type="button"
          style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
          onClick={decoratedOnClick}
        >
          {children}
        </button>
      );
    }

    return (
        <>
            <Accordion defaultActiveKey={index}>
                <Card>
                    <Card.Header>
                        <ContextAwareToggle eventKey="0" >View Me</ContextAwareToggle>
                        <h6>{header}</h6>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {post}
                        <br></br>
                        <br></br>
                        <br></br>
                        <Button onClick={handleGetComment} className="mb-3">View Comments</Button>
                        {comments.map((comments, key) => {
                          if (comments.id === id) {
                            return <Comments username={comments.username} message={comments.message} id={id}/>
                          } else {
                            return "";
                          }
                        })}
                        <br></br>
                        <Comment id={id} />
                      </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            
            <br></br>
        </>
    )
}

export default Post;
