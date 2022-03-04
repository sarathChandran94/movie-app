import axios from "axios"
import ListGroup from "react-bootstrap/ListGroup"
import Tab from 'react-bootstrap/Tab';
import './Categories.css'

const Categories = (props) => {
    // const [isActive, setIsActive] = useState(false)
    // console.log(props)

    const clickHandle = (e,id,name) => {
        // console.log(e)
        props.setCatSel(name)
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=17e786d5aa65a489c613aaca6427cd5e&include_adult=false&with_genres=${id}`)
            .then(res => {
                console.log(res.data.results)
                props.setMov(res.data.results)
            }).catch(e => console.log(e))
    }

    return (
        <>
            <Tab.Container className="pt-3"  id="left-tabs-example" defaultActiveKey="first">
                <ListGroup>
                    {
                        props.cat.map(v => {
                            return (
                                <ListGroup.Item action onClick={(e) => clickHandle(e,v.id,v.name)} key={v.id} className="categoryButton m-1" variant="warning">
                                    {v.name}
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
