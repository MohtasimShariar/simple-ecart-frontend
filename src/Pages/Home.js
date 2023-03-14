import React, {useEffect, useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import {  BiSearch } from 'react-icons/bi';
import SearchFilter from 'react-filter-search';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [theme] = useThemeHook();
    const [searchInput, setSearchInput] = useState('');
    const [productData, setProductData] = useState([]);
    const [categotiesData, setCategoriesData] = useState([]);

    console.log(searchInput)

    async function getResponse(){
        const res = await fetch("http://localhost:9001/products")
                          .then(res=> res.json());
                          setProductData(await res);

        const categoryRes = await fetch("http://localhost:9001/categories")
                          .then(res=> res.json());
                          setCategoriesData(await categoryRes);
    }

   const getDataByCategories =  async (id)=> {
    const res = await fetch(`http://localhost:9001/products/bycategory/${id}`)
    .then(res=> res.json());
    setProductData(await res);
    }
    // https://fakestoreapi.com/products
    useEffect(()=>{
        getResponse();
        
    },[]);

    const handleCategories = (id)=>{
       id ?  getDataByCategories(id) : getResponse();

    }

    console.log(categotiesData)

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    <h1 className={theme? 'text-light my-5': 'text-black my-5'}>Search products</h1>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                </Col>
                {/* filter buttons */}
                <h3 className='text-center pb-2'>Filtered By</h3>
                <Row>
                    <Col className='text-center mb-4'>
                    <Button onClick={()=> handleCategories()} className='mx-2' variant="secondary">All</Button>
                    {
                        categotiesData?.map((category,i)=> <Button onClick={()=> handleCategories(category.id)} className='mx-2' key={i} variant="secondary">{category.name}</Button> )
                    }
                    </Col>
                </Row>

                {/* filter Products */}
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                           
                            {results.map((item, i)=>(  <Col md="4">
                                <ProductCard data={item} key={i} />
                                </Col>
                            ))}
                                
                            
                           
                        </Row>
                    )}
                />
                
            </Row>
        </Container>
    );
};

export default Home;