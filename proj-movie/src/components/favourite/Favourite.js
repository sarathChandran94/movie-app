import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from "react"
import { Context } from '../body/Body'


const Favourite = () => {
    // console.log(DataContext)
    // const { Data } = useContext(Context)
    // console.log(Data)
    // const [fav, setFav] = Data
    const [fav, setFav] = useState([])
    console.log(fav)
    return (
        <>
            <div>
            <h1>Favourites</h1>
            {fav.length === 0  ? <h3>No favourites yet...</h3> :
            <Row xs={1} sm={2} md={3} >
            {
                fav.map((v, i) => {
                    return (
                        <>
                            <Col>

                            <Card style={{height: '300px'}} className="movieCard shadow shadow-sm">
                                <Card.Img style={{height: '150px'}} variant="top" src={v.poster_path} />
                                <Row>
                                    <Col>
                                        <Card.Text></Card.Text>
                                    </Col>
                                    <Col>
                                            <Card.Text>Rating:{v.vote_average}</Card.Text>
                                    </Col>
                                </Row>
                                <Card.Body>
                                    <Card.Title>{v.title || v.name}</Card.Title>
                                    <Row>
                                        <Col>
                                            <Card.Text>{v.release_date }</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text>Genre:</Card.Text>
                                        </Col>
                                    </Row>
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
        </>
     );
}

export default Favourite;
