import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import Tab from 'react-bootstrap/Tab';
import './Categories.css'

const Categories = (props) => {

    const clickHandle = (id,name) => {
        console.log(id)
        props.setCatSel(name)
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=17e786d5aa65a489c613aaca6427cd5e&include_adult=false&with_genres=${id}`).then(res => {
            console.log(res.data.results)
            props.setMov(res.data.results)
        })
    }

    return (
        <>
            <Tab.Container className="pt-3"  id="left-tabs-example" defaultActiveKey="first">
                <ListGroup >
                    {
                        props.cat.map((v,i) => {
                            return (
                                <ListGroup.Item action  onClick={() => clickHandle(v.id,v.name)} key={v.id} className="categoryButton m-1" variant="warning">
                                    <h4>{v.name}</h4>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Tab.Container>
        </>
     );
}

export default Categories;
