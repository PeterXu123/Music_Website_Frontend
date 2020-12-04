import React, {Component} from 'react'


class CommentComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <li className= "list-group-item">
               <div className="row">
                   <div style={{width: "5%"}}>
                       <img width={"100%"} height={"100%"} src={"https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp"}/>
                   </div>
                   <div style={{width: "90%", marginLeft:"2.5%"}}>
                        <div style={{fontWeight: "bold"}} className="row">
                            joe
                        </div>
                       <div className="row">
                           <p>sdfdsfaadsfsdfdsfdfdsfadsfadsfadsfsdfdsfadsfsdfdsfadsfadsfadsfsdfdsfadsfadsfadsf</p>
                       </div>
                   </div>
               </div>
            </li>
        )
    }
}

export default CommentComponent
