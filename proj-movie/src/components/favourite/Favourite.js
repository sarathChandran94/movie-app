import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState,useEffect } from "react"

import '../body/Body.css'
import { Container } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


const Favourite = () => {


    const [fav, setFav] = useState([])
    useEffect(() => {
        setFav(JSON.parse(localStorage.getItem('fMov')))
    },[])
    console.log(fav)
    const handleClick = (id) => {
        const filteredItems = fav.filter((v, i) => {
            return i !== id
        })
        setFav(filteredItems)
    }
    return (
        <>
            <div>
                <div className='foreground'>
                    <Container className='heading'>
                        <h1 >Favourites</h1>
                    </Container>
                    {fav.length === 0  ? <h3 style={{color: 'grey'}}>No favourites yet...</h3> :
                    <Row xs={1} sm={2} md={6} >
                    {
                        fav.map((v, i) => {
                            return (
                                <>
                                    <Col key={v[0].id} >
                                        <Card style={{height: '450px'}} className="movieCard">
                                            <Card.Img style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v[0].poster_path}`} />
                                            <Row>
                                                <Col className='m-2'>
                                                    <Card.Text><RemoveCircleOutlineIcon  onClick={() => handleClick(i)} />Remove</Card.Text>
                                                </Col>
                                                <Col className='m-2'>
                                                    <CircularProgress variant="determinate" value={v[0].vote_average * 10} />
                                                    <Card.Text>{v[0].vote_average}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Card.Body>
                                                <Card.Title>{v[0].title || v[0].name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    {/* <Col >
                                        <Card key={i} style={{height: '450px',width: '150px'}} className="movieCard shadow shadow-sm">
                                            <Card.Img style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v[0].poster_path}`} />
                                            <Row>
                                                <Col>
                                                    <Card.Text></Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text>Rating:{v[0].vote_average}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Card.Body>
                                                <Card.Title>{v[0].title || v[0].name}</Card.Title>
                                                <Row>
                                                    <Col>
                                                        <Card.Text>{v[0].release_date }</Card.Text>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text>Genre:</Card.Text>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col> */}
                                </>
                            )
                        })
                    }
                    </Row>
                    }
                </div>
            </div>
        </>
     );
}

export default Favourite;
