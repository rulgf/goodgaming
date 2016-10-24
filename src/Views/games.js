/**
 * Created by Raul on 18/10/2016.
 */
import React, { Component } from 'react';

import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import $ from 'jquery';

const url ='http://localhost/goodgaming/public/';
const resources ='http://localhost/goodgaming/resources';

const styles = {
    gameImg: {
        height: '200px',
        width: '160px',
    }
};

export default class Games extends Component{
    constructor(props){
        super(props);

        this.state={
            games: [],
        };
    }

    componentDidMount(){
        this.allgames();
    }

    //Obtain last games
    allgames(){
        $.ajax({
            type: 'GET',
            url: url + 'allgames',
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //Recorro y guardo los resultados
                var games=[];
                for(var i=0; i<data.length; i++){
                    var platform = [];
                    for (var j=0;j<data[i].platforms.length; j++ ){
                        platform.push(data[i].platforms[j].name);
                    }

                    var rate= 'No reviews yet';
                    if(data[i].avg_rating[0]){
                        rate = data[i].avg_rating[0].aggregate;
                    }

                    games.push(
                        {
                            key: data[i].id,
                            id: data[i].id,
                            img: resources + data[i].image,
                            title: [data[i].name, data[i].description],
                            developer: data[i].developer,
                            platform: platform,
                            rate: rate
                        }
                    );
                }
                this.setState({games: games}, function(){
                    //console.log(this.state.games);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    imageTable(cell, row){
        return (
            <div>
                <Link to={"/game/" + row.id}>
                    <img src={cell} style={styles.gameImg} alt={row.title[0]}/>
                </Link>
            </div>
        )
    }

    titleTable(e, row){
        return(
            <div className="col-md-12">
                <Link to={"/game/" + row.id}>
                    <h4>{e[0]}</h4>
                </Link>
                <span>{e[1]}</span>
            </div>
        );
    }
    render() {

        return(
            <div className="col-md-12">
                <h1>Como cuando eres un vista de juegos</h1>
                <h2>zoi la bizta d juegoz xdxdxdxdxdxdxdxdxdxd</h2>
                <BootstrapTable data={this.state.games}
                                options={{ noDataText :"No games found"}}
                                pagination={true}
                                hover={true}
                                search={true}>
                    <TableHeaderColumn hidden={true} dataField="id" isKey={true}>n.º</TableHeaderColumn>
                    <TableHeaderColumn dataField="img" dataFormat={this.imageTable.bind(this)} >&nbsp;</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" width="250" dataFormat={this.titleTable.bind(this)} >Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="developer" >Developer</TableHeaderColumn>
                    <TableHeaderColumn dataField="platform" >Platform</TableHeaderColumn>
                    <TableHeaderColumn dataField="rate" dataSort={true}>Rate</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}