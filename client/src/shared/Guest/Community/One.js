import React from 'react';
import TopNav from '../TopNav';

const list = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container">
      <div id="one" className="col s12">
        <h2>One</h2>
        <ul className="collection">
          {
            list.map((d, i) => {
              return (
                <li key={i} className="collection-item avatar">
                  <img src="https://cs3design.com/wp-content/uploads/2017/04/checkmark.png" alt="" className="circle" />
                  <span className="title">{d}</span>
                  <p>First Line</p>
                  <p>Second Line</p>
                  <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  </div>

);
