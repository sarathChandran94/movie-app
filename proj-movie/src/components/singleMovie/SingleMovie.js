import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { Button, Col, Container, Row } from "react-bootstrap";
import './SingleMovie.css'

const SingleMoviePage = (props) => {
    const [smd, setSmd] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getSmd = () => {
            axios.get(`https://api.themoviedb.org/3/movie/${props.value}?api_key=17e786d5aa65a489c613aaca6427cd5e&language=en-US`)
                .then(res => {
                    console.log(res)
                    setSmd(res.data)
                })
        }
        getSmd();
    },[props.value])

    return (
        <>
            <Container >
                <Button onClick={() => {navigate(0)}} variant='danger dark'>Go Back</Button>
                <Row className='m-5 bg-white rounded' >
                    <Col md={4}>
                        <img className='m-2 rounded shadow' style={{height: '300px'}} src={`https://image.tmdb.org/t/p/w300/${smd.poster_path}`} alt={smd.title}></img>
                    </Col>
                    <Col md={8}>
                        <Row className='m-2 border-bottom border-success shadow'>
                            <h1>{ smd.title }</h1>
                        </Row>
                        <Row className='m-2 pt-2 border-bottom border-success shadow'>
                            <Col className='align-items-center'>
                                <CircularProgress variant="determinate" value={smd.vote_average * 10} />
                                <h5>{ smd.vote_average }</h5>
                            </Col>
                            <Col className='align-items-center'>
                                <h5><span className='text-secondary'>Runtime: </span>{ smd.runtime } mins</h5>
                            </Col>
                            <Col className='align-items-center'>
                                <h5><span className='text-secondary'>Released on: </span>{ (smd.release_date) }</h5>
                            </Col>
                        </Row>
                        <Row>
                             <h3><span style={{color:'orangered'}}>Plot: </span>{ smd.overview }</h3>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
     );
}

export default SingleMoviePage;
