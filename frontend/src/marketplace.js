import React, {useEffect, useState} from "react"
//import axios from "axios" //not axios (twice) need to be changed
import { useNavigate, Link} from "react-router-dom"
import CreateItem from "./createItem"

function marketplace () {
    //Use effect to call view items here
    return (
        <div>
            <h1>Marketplace</h1>
            <CreateItem />
        </div>
    )
}

export default marketplace;