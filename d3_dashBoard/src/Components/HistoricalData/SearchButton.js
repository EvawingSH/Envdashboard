import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {useState} from 'react'

const SearchButton= (props) => {

    const [value, setValue]=useState(props)

    console.log(props)


    return (
        <div style={{marginTop: 10}}>
            
                <Button
                        variant='outline-dark'
                        style={{ borderWidth: 2 }}
                        onClick={(e) => setValue({Time: props.Time, 
                                                  CompareSensor: props.Sensor,
                                                activeSensor: props.activeSensor})}
                    >
                        Go
                    </Button>
        </div>
    )

}

export default SearchButton