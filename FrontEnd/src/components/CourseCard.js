import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';


export default function CourseCard({courseProp}) {
    const {name, description, price} = courseProp;
    const [count, setCount] = useState(0);
    console.log(useState(0));

    function enroll(){
        setCount(count + 1);
        console.log('Enrollees: ' + count);
    }


    return (
        <Card>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle>Description:</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Subtitle>Price:</Card.Subtitle>
            <Card.Text>{price}</Card.Text>
            <Button className="bg-primary" onClick={enroll}>Enroll</Button>
        </Card.Body>
    </Card>
    )
}

CourseCard.propTypes = {
    course: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}