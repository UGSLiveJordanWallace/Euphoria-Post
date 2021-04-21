import React, { useContext } from 'react'
import { Card, Accordion, AccordionContext, useAccordionToggle } from 'react-bootstrap';

const Post = ({ header, email, post, index }) => {

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
                      <p>{email}</p>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body><h3>{header}</h3> {post}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <br></br>
        </>
    )
}

export default Post;
