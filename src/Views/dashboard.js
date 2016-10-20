/**
 * Created by Raul on 17/10/2016.
 */
import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


import $ from 'jquery';

const url ='http://localhost/goodgaming/public/';
const resources ='http://localhost/goodgaming/resources';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
};

export default class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state={
            games: [],
        };
    }

    componentDidMount(){
        this.lastgames();
    }

    //Obtain last games
    lastgames(){
        $.ajax({
            type: 'GET',
            url: url + 'games',
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //Recorro y guardo los resultados
                var games=[];
                for(var i=0; i<data.length; i++){
                    games.push(
                        {
                            key: data[i].id,
                            img: resources + data[i].image,
                            title: data[i].name,
                            author: data[i].developer
                        }
                    );
                }
                this.setState({games: games}, function(){
                    console.log(this.state.games);
                });
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                //console.error(this.props.url, status, err.toString());
            }
        });
    }

    gridList(){
        return(
            <div style={styles.root}>
                <GridList style={styles.gridList} cols={2.2} cellHeight={230}>
                    {this.state.games.map((game) => (
                        <GridTile
                            key={game.img}
                            title={game.title}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        >
                            <img alt={game.title} src={game.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }

    render() {
        return(
            <div className="col-md-12">
                <h1>Como cuando eres un dashboard</h1>
                <h2>zoi el dachbord xdxdxdxdxdxdxdxdxdxd</h2>
                {this.gridList()}
            </div>
        );
    }
}