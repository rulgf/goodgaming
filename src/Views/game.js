/**
 * Created by Raul on 17/10/2016.
 */
import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

import $ from 'jquery';

const url ='http://localhost/goodgaming/public/';
const resources ='http://localhost/goodgaming/resources';

const styles = {
    gameImg: {
        height: '80%',
        width: '80%'
    }
};

export default class Game extends Component{
    constructor(props){
        super(props);

        this.state={
            game: {},
            reviews: [],

            //myReview
            errors: [],
            erroropen: false,
            boolreview: false,
            title: '',
            description: '',
            rate: 0,
            upvotes: 0,
            downvotes: 0,


        };
    }

    componentDidMount(){
        this.loadGame();
        this.loadReviews();
        this.loadUserReview();
    }

    /*
    Input Handlers
     */
    handleTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    handleRate(e){
        this.setState({
            rate: e.target.value
        });
    }

    handleDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    /*
    Obtain game info
     */
    loadGame(){
        $.ajax({
            type: 'GET',
            url: url + 'game/' + this.props.params.gameId,
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //Recorro y guardo los resultados
                var game={};
                var platform = [];
                for (var j=0;j<data.platforms.length; j++ ){
                    platform.push(data.platforms[j].name);
                }

                var rate= 'No reviews yet';
                if(data.avg_rating[0]){
                    rate = data.avg_rating[0].aggregate;
                }

                game=
                    {
                        key: data.id,
                        id: data.id,
                        img: resources + data.image,
                        title: data.name,
                        description: data.description,
                        developer: data.developer,
                        platform: platform,
                        rate: rate
                    };

                this.setState({game: game}, function () {
                    //console.log(this.state.game);
                });
            },
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    /*
     Obtain last reviews
     */
    loadReviews(){
        $.ajax({
            type: 'GET',
            url: url + 'gamereviews/' + this.props.params.gameId,
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                //Recorro y guardo los resultados
                var reviews=[];
                for(var i=0; i<data.length; i++){
                    var upvotes =0;
                    if(data[i].count_upvotes[0]){
                        upvotes = data[i].count_upvotes[0].upvotes
                    }

                    var downvotes=0;
                    if(data[i].count_downvotes[0]){
                        downvotes = data[i].count_downvotes[0].downvotes
                    }

                   reviews.push(
                        {
                            key: data[i].id,
                            id: data[i].id,
                            title: [data[i].title, data[i].description],
                            description: data[i].description,
                            rate: data[i].rate,
                            votes: [upvotes, downvotes],
                            routes: data[i].id
                        }
                    );
                }
                this.setState({reviews: reviews});
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    /*
     Obtain user review
     */
    loadUserReview(){
        $.ajax({
            type: 'GET',
            url: url + 'usereview/' + this.props.params.gameId,
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if(data.error){
                    this.setState({boolreview: false});
                }else{
                    //El usuario tiene review
                    var upvotes =0;
                    if(data.count_upvotes[0]){
                        upvotes = data.count_upvotes[0].upvotes
                    }

                    var downvotes=0;
                    if(data.count_downvotes[0]){
                        downvotes = data.count_downvotes[0].downvotes
                    }
                    this.setState({
                        title: data.title,
                        description: data.description,
                        rate: data.rate,
                        upvotes:upvotes,
                        downvotes: downvotes,
                        boolreview: true,
                    });

                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }


    /*
     Render game info of table
     */
    titleTable(e, row){
        return(
            <div className="col-md-12">
                <h4>{e[0]}</h4>
                <span>{e[1]}</span>
            </div>
        );
    }

    /*
     Send Review
     */
    writeReview(){
        $.ajax({
            type: 'POST',
            url: url + 'writereview/' + this.props.params.gameId,
            context: this,
            dataType: 'json',
            cache: false,
            data: {
                title: this.state.title,
                description: this.state.description,
                rate: this.state.rate,
            },
            success: function (data) {
                if(data.error){
                    //Si hay errores guardarlos
                    this.setState({errors: [data.error.msg]}, function(){
                        this.setState({erroropen: true});
                    });
                }else{
                    //Guardo el usuario logeado
                    this.loadUserReview();
                    this.setState({
                        title: '',
                        description: '',
                        rate: 0,
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    //Upvote and Downvote button
    voteButton(e, row){
        return(
            <div>
                <Badge
                    badgeContent={row.votes[0]}
                    primary={true}
                    badgeStyle={{top: 12, right: 12}}
                >
                    <IconButton
                        tooltip="Upvote"
                        onTouchTap={this.handleUpvotes.bind(this, e)}
                    >
                        <ActionThumbUp />
                    </IconButton>
                </Badge>
                <Badge
                    badgeContent={row.votes[1]}
                    secondary={true}
                    badgeStyle={{top: 12, right: 12}}
                >
                    <IconButton
                        tooltip="Downvote"
                        onTouchTap={this.handleDownvotes.bind(this, e)}
                    >
                        <ActionThumbDown />
                    </IconButton>
                </Badge>
            </div>
        );
    }


    handleUpvotes(id){
        this.vote(id, 1);
    }

    handleDownvotes(id){
        this.vote(id, 0);
    }

    handleCloseError(){
        this.setState({erroropen: false});
    }

    vote(id, value){
        $.ajax({
            type: 'POST',
            url: url + 'upvote/' + id,
            context: this,
            dataType: 'json',
            cache: false,
            data: {
                value: value,
            },
            success: function (data) {
                if(data.error){
                    //Si hay errores guardarlos
                    this.setState({errors: [data.error.msg]}, function(){
                        this.setState({erroropen: true});
                    });
                }else{
                    //Guardo el usuario logeado
                    this.loadReviews();
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        var content =[];
        if (this.state.boolreview === true){
            content =[
                <CardTitle title="Your Review about this game" />,
                <CardHeader
                    title={this.state.title}
                    subtitle={this.state.rate}
                />,
                <CardText>
                    {this.state.description}
                </CardText>,
                <CardActions>
                    <Badge
                        badgeContent={this.state.upvotes}
                        primary={true}
                        badgeStyle={{top: 12, right: 12}}
                    >
                        <IconButton
                            tooltip="Upvotes"
                        >
                            <ActionThumbUp />
                        </IconButton>
                    </Badge>
                    <Badge
                        badgeContent={this.state.downvotes}
                        secondary={true}
                        badgeStyle={{top: 12, right: 12}}
                    >
                        <IconButton
                            tooltip="Downvote"
                        >
                            <ActionThumbDown />
                        </IconButton>
                    </Badge>
                </CardActions>
            ];
        }else{
            content =[
                <CardTitle title="Write Your Review" />,
                <CardText>
                    <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        type="text"
                        onChange={this.handleTitle.bind(this)}
                    />
                    <TextField
                        hintText="Rate"
                        floatingLabelText="Rate(0-10)"
                        type="number"
                        onChange={this.handleRate.bind(this)}
                    />
                    <TextField
                        hintText="Your Review"
                        floatingLabelText="Your Review"
                        type="text"
                        fullWidth={true}
                        onChange={this.handleDescription.bind(this)}
                    />
                </CardText>,
                <CardActions>
                    <FlatButton
                        label="Send Review"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.writeReview.bind(this)}
                    />,
                </CardActions>
            ];
        }

        return(
            <div className="col-md-12">
                <div className="col-md-12">
                    <div className="col-md-4">
                        <img style={styles.gameImg} alt={this.state.game.name} src={this.state.game.img}/>
                    </div>
                    <div className="col-md-6">
                        <h1>{this.state.game.title}</h1>
                        <p>{this.state.game.description}</p>
                    </div>
                    <div className="col-md-2">
                        {this.state.game.rate}
                    </div>
                </div>
                <div className="col-md-12">
                    <Card>
                        {content}
                    </Card>
                </div>
                <div className="col-md-12">
                    <BootstrapTable data={this.state.reviews}
                                    options={{ noDataText :"No reviews found"}}
                                    pagination={true}
                                    hover={true}>
                        <TableHeaderColumn hidden={true} dataField="id" isKey={true}>n.º</TableHeaderColumn>
                        <TableHeaderColumn dataField="rate" dataSort={true}>Rate</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataFormat={this.titleTable.bind(this)} >Review</TableHeaderColumn>
                        <TableHeaderColumn dataField="routes" dataFormat={this.voteButton.bind(this)} >Votes</TableHeaderColumn>
                    </BootstrapTable>
                    <Snackbar
                        open={this.state.erroropen}
                        message={this.state.errors[0]}
                        autoHideDuration={4000}
                        onRequestClose={this.handleCloseError.bind(this)}
                    />
                </div>
            </div>
        );
    }
}