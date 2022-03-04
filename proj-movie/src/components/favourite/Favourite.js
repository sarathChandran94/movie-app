import { useState, useEffect, useContext } from "react"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import '../body/Body.css'
import { DataContext } from '../../context/Context'


const Favourite = () => {

    const [movieList, setMovieList] = useState([])

    const { favoritesList, removeFavorite } = useContext(DataContext)

    useEffect(() => {
        setMovieList(favoritesList)
    }, [favoritesList]);
    console.log(movieList)


    // useEffect(() => {
    //     setFav(JSON.parse(localStorage.getItem('fMov')))
    // },[])
    // console.log(fav)
    // const handleClick = (id) => {
    //     const filteredItems = movieList.filter((v, i) => {
    //         return i !== id
    //     })
    //     setMovieList(filteredItems)
    // }
    return (
        <>
            <div>
                <div className='foreground'>
                    <Container className='heading'>
                        <h1 >Favorites</h1>
                    </Container>
                    {movieList.length === 0  ? <h3 style={{color: 'grey'}}>No favorites yet...</h3> :
                    <Row xs={1} sm={2} md={6} >
                    {
                        movieList.map((v, i) => {
                            return (
                                <>
                                    <Col key={i} >
                                        <Card key={i} style={{height: '450px'}} className="movieCard">
                                            <Card.Img style={{height: '300px'}} variant="top" src={`https://image.tmdb.org/t/p/w300/${v.poster_path}`} />
                                            <Row>
                                                <Col className='m-2'>
                                                    <Button variant='danger' size='sm' onClick={() => removeFavorite(i)}><span><RemoveCircleOutlineIcon /></span>Remove</Button>
                                                </Col>
                                                <Col className='m-2'>
                                                    <CircularProgress variant="determinate" value={v.vote_average * 10} />
                                                    <Card.Text>{v.vote_average}</Card.Text>
                                                </Col>
                                            </Row>
                                            <Card.Body>
                                                <Card.Title>{v.title || v.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
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
