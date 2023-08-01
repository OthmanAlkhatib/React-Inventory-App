import { useState } from "react";

function ItemsDisplay(props) {
    
    const showItem = (item) => {
        return (
            <tr>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>{item.brand}</td>
                <td><button className="btn btn-danger ps-2 pe-2 pt-0 pb-0" onClick={() => props.deleteMe(item)}>Delete</button></td>
            </tr>
        );
    };

    return (
        <div className="container">
            <div className="row">
                <h2>Items</h2>
            </div>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Type</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(showItem)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ItemsDisplay